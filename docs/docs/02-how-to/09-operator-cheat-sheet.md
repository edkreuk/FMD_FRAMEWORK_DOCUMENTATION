---
title: "Operator cheat sheet"
---

# Operator cheat sheet

The handful of queries and rules you reach for when a load looks wrong, on one page. Everything here is condensed: the fuller reasoning is in [run FMD in production](./04-run-fmd-in-production.md) and [diagnose a failed load](./05-diagnose-a-failed-load.md), which each link is a pointer into.

You need SQL access to `SQL_FMD_FRAMEWORK`, the configuration database. Not the Fabric monitoring pane: every query below runs against that database.

## The one rule

**Red means a layer broke. Green means nothing about any individual entity.** A copy that fails for one entity is caught inside the `ForEach`, so the run stays green and the only record is a row in `logging.CopyActivityExecution`. Alert on the database, not on the run status. ([why](./04-run-fmd-in-production.md#2-alert-on-the-database-not-on-the-run-status); on a `2026.07` pin the run status is even weaker, see [version differences](../03-reference/08-version-differences.md).)

## Query 1: did this run load anything?

Row counts, last 12 hours. All three zero means the run did not start or the audit connection is missing; `CopyActivityExecution = 0` means nothing was copied. ([reading the result](./05-diagnose-a-failed-load.md#step-1-did-this-run-load-anything-at-all))

```sql
DECLARE @since DATETIME2 = DATEADD(hour, -12, GETDATE());

SELECT 'PipelineExecution'     AS tbl, COUNT(*) AS n FROM logging.PipelineExecution     WHERE LogDateTime >= @since
UNION ALL
SELECT 'CopyActivityExecution',       COUNT(*)      FROM logging.CopyActivityExecution WHERE LogDateTime >= @since
UNION ALL
SELECT 'NotebookExecution',           COUNT(*)      FROM logging.NotebookExecution     WHERE LogDateTime >= @since;
```

## Query 2: what failed, across all three tables

A failure lands in a different table depending on what failed, and a query against `PipelineExecution` alone misses the most common one. Note the notebook branch filters on `LogData`, not `LogType`. ([why all three](./04-run-fmd-in-production.md#the-alert-has-to-read-all-three-tables))

```sql
DECLARE @since DATETIME2 = DATEADD(day, -1, GETDATE());

SELECT 'pipeline' AS src, PipelineName AS name, EntityLayer, EntityId,
       LogDateTime, CAST(LogData AS varchar(400)) AS LogData
FROM   logging.PipelineExecution
WHERE  LogDateTime >= @since AND LogType LIKE 'Fail%'

UNION ALL
SELECT 'copy', CopyActivityName, EntityLayer, EntityId,
       LogDateTime, CAST(LogData AS varchar(400))
FROM   logging.CopyActivityExecution
WHERE  LogDateTime >= @since AND LogType LIKE 'Fail%'

UNION ALL
SELECT 'notebook', NotebookName, EntityLayer, EntityId,
       LogDateTime, CAST(LogData AS varchar(400))
FROM   logging.NotebookExecution
WHERE  LogDateTime >= @since AND LogData LIKE '%"Action":%"Error"%'

ORDER BY LogDateTime;
```

`LIKE 'Fail%'` (not equality) is deliberate and belt-and-braces on `main`, load-bearing on `2026.07`.

## Query 3: unclosed starts

Some failures write no closing row at all, so Query 2 misses them. This finds a `Start` with no matching `End`. A notebook that dies on a primary-key check, or (on `main`) inside its `try`, shows up only here. ([the two no-row mechanisms](../03-reference/02-logging-and-auditing.md#step-4-if-there-is-no-error-row-at-all))

```sql
SELECT s.PipelineName, s.EntityLayer, s.LogDateTime AS started
FROM   logging.PipelineExecution s
LEFT   JOIN logging.PipelineExecution e
       ON  e.PipelineRunGuid = s.PipelineRunGuid
       AND e.LogType LIKE 'End%'
WHERE  s.LogType LIKE 'Start%'
  AND  s.LogDateTime >= DATEADD(day, -1, GETDATE())
  AND  e.PipelineRunGuid IS NULL;
```

Run the same shape against `NotebookExecution` and `CopyActivityExecution`.

## Correlating a run

Reconstruct a run in time order, and join a notebook to its layer pipeline on `PipelineRunGuid` (`TriggerGuid` also works); never on `PipelineParentRunGuid`. A pipeline still does not join to the pipeline that invoked it, so the layers of one run are tied together by **timestamp**. ([full detail](../03-reference/02-logging-and-auditing.md#how-a-run-holds-together-and-where-the-chain-is-broken))

## Before it carries a real load

| Do | One line |
|---|---|
| **Pin a version** | `branch = "2026.07"` in `NB_SETUP_FMD.ipynb`, not `"main"`, so a re-run is not an uncontrolled upgrade. |
| **Verify the audit trail** | `SELECT COUNT(*) FROM logging.PipelineExecution` after the first run. Zero means the deployment is broken, not that the night was quiet. |
| **Set the config cells** | On `2026.07`, cells 7, 9 and 14 ship with the author's tenant and must be replaced; on `main` they are placeholders. |
| **Choose `domain_name` once** | Fabric will not reuse a deleted SQL database's name. If a deploy goes wrong, change `domain_name`; do not delete and retry. |
| **Alert on the four blind spots** | The framework cannot watch these for you: the [four places in production](./04-run-fmd-in-production.md#3-where-you-have-to-watch-because-the-framework-cannot). |

## Which pin am I on?

`ENV_FMD`'s `runtime_version` is the tell: `1.3` is `2026.07`, `2.0` is `main`. Or `SELECT DISTINCT LogType FROM logging.PipelineExecution WHERE LogType LIKE 'Fail%'`: `FailPipeline`/`FailPipelineActivity` is `2026.07`, only `FailedPipeline` is `main`. The full behaviour list is in [version differences](../03-reference/08-version-differences.md).

---

Source: the queries and rules on this page are condensed from [run FMD in production](./04-run-fmd-in-production.md) and [diagnose a failed load](./05-diagnose-a-failed-load.md); each links to its origin.
