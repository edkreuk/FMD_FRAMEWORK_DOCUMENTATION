---
title: "Schedule groups"
---

# Schedule groups

A schedule group is a **metadata filter for landing-zone extraction**, not a Fabric schedule or an independent end-to-end processing lane. It lets you assign different landing-zone entities to different cadences while keeping the framework's pipelines generic. Fabric schedules are still created and managed in Fabric.

The configuration database stores groups in `integration.ScheduleGroup` and their memberships in `integration.ScheduleGroupEntity`. A landing-zone entity can belong to more than one group, but the `(ScheduleGroupId, LandingzoneEntityId)` key ensures it appears only once within each group.

## What the group filters

The optional pipeline parameter `ScheduleGroupName` defaults to `Default`. The landing-zone lookup uses it with the data workspace to filter `execution.vw_LoadSourceToLandingzone`; only active entities that belong to the requested group are extracted.

The filter does **not** isolate the whole medallion run. Bronze and Silver do not accept `ScheduleGroupName`; they consume the shared pending-work queues. A run for one group can therefore process work already queued by another group. Use groups to control which entities are extracted on a cadence, not to promise separate Bronze/Silver execution or run histories.

An unknown or empty group name returns no landing-zone entities; it does not fall back to `Default` or load everything. The group name is passed through the Fabric pipeline chain, but is not forwarded to external Azure Data Factory pipelines.

## The way to use them

1. **Upgrade the configuration database and pipelines together.** Run `NB_SETUP_FMD.ipynb` with the updated framework. Deployment creates the two group tables, updates the landing-zone view and initializes the default group. Do not deploy only the SQL schema or only the pipelines.
2. **Choose the entities for each cadence.** `integration.sp_UpsertScheduleGroup` creates a named group. `integration.sp_UpsertScheduleGroupEntity` adds an entity to it:

   ```sql
   EXECUTE [integration].[sp_UpsertScheduleGroup]
       @ScheduleGroupName = N'Hourly';

   EXECUTE [integration].[sp_UpsertScheduleGroupEntity]
       @LandingzoneEntityId = 42,
       @ScheduleGroupName = N'Hourly';
   ```

   Both procedures are safe to repeat. The `Default` group cannot be renamed, because new entities are assigned to it.

   Initialization puts every existing entity in `Default`, and new entities are added there automatically. Adding an entity to `Hourly` does **not** remove it from `Default`, so it will be selected by both schedules unless that overlap is intentional. To move it to only `Hourly`, remove its default membership:

   ```sql
   DELETE SGE
   FROM integration.ScheduleGroupEntity AS SGE
   JOIN integration.ScheduleGroup AS SG
     ON SG.ScheduleGroupId = SGE.ScheduleGroupId
   WHERE SG.ScheduleGroupName = N'Default'
     AND SGE.LandingzoneEntityId = 42;
   ```

   The current registration procedures add default membership again when an entity is upserted, and `sp_InitializeDefaultScheduleGroup` backfills every entity into `Default`. Reapply the membership split after re-registering an entity or rerunning initialization. There is no stored procedure for removing a membership.
3. **Create a Fabric schedule for the pipeline**, as described in [Schedule the load](../02-how-to/03-schedule-the-load.md). Set `ScheduleGroupName` to the group for that cadence. Use `Default` to load its current membership. For example, a second schedule can pass `Hourly` and run at a different frequency.
4. **Verify the membership and the lookup** before relying on the schedule:

   ```sql
   SELECT SG.ScheduleGroupName, LZE.LandingzoneEntityId, LZE.SourceName
   FROM integration.ScheduleGroup AS SG
   JOIN integration.ScheduleGroupEntity AS SGE
     ON SGE.ScheduleGroupId = SG.ScheduleGroupId
   JOIN integration.LandingzoneEntity AS LZE
     ON LZE.LandingzoneEntityId = SGE.LandingzoneEntityId
   WHERE SG.ScheduleGroupName = N'Hourly';
   ```

   An empty result from the group's landing-zone lookup is a successful run that loads nothing, so verify membership as well as pipeline status.

Initialization is idempotent: it creates `Default` if needed and adds missing memberships for every existing landing-zone entity, including inactive ones, without removing custom memberships. New entities are assigned to `Default` in the same transaction by an insert trigger; the registration procedures also maintain that membership. If a bulk-load tool bypasses triggers, run `integration.sp_InitializeDefaultScheduleGroup` afterward.

If an existing schedule or saved run explicitly passes an empty string for `ScheduleGroupName`, update it to `Default`. An omitted parameter uses its default, but an explicitly supplied empty value is not treated as omitted.

---

Source: `Readme.md`, `FMD_FRAMEWORK_DEPLOYMENT.md`, `src/Config_Database/integration/{Tables,StoredProcedures,Triggers}/*.sql`, and `src/Config_Database/execution/Views/vw_LoadSourceToLandingzone.sql` @ [487e6d1](https://github.com/edkreuk/FMD_FRAMEWORK/commit/487e6d18e2e6535bb886bc113d723ee5c3a8bd5d)
