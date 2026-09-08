---
title: "Version differences: 2026.07 and main"
---

# Version differences: `2026.07` and `main`

This page is one place to answer a single question: **does this behaviour depend on which version I deployed?**

FMD's latest tagged release is **`2026.07`** (which ships the code at `1ba7974`). Between that tag and the current `main` (`b5fb08e`), the maintainer merged a run of fixes, none of which is in a release yet. So a deployment pinned to `2026.07` and a deployment tracking `main` behave differently in the places below, and every other page states the difference inline where it matters. This table collects them, so you can check a behaviour against your own pin without reading the page that owns it.

The rule everywhere in this documentation: a page describes `main`, and marks the `2026.07` behaviour in a callout. This page is the index to those callouts.

## The matrix

Each row is a behaviour that differs. The left column is what a deployment **pinned to `2026.07` or earlier** does; the right is what **`main`** does; the last names the pull request that changed it.

| Area | Up to and including `2026.07` | On `main` | PR |
|---|---|---|---|
| **Run status on a layer failure** | `PL_FMD_LOAD_ALL` is a Try-Catch graph with no `Fail` activity, so a landing-zone or Bronze failure produces a **green run**; only a Silver failure surfaces | Each layer has an `FA_THROW_ERROR_*`, so a failed layer fails the run and you can trust the red | [#250](https://github.com/edkreuk/FMD_FRAMEWORK/pull/250), [#253](https://github.com/edkreuk/FMD_FRAMEWORK/pull/253), [#257](https://github.com/edkreuk/FMD_FRAMEWORK/pull/257) |
| **Landing-zone failure audit** | `PL_FMD_LOAD_LANDINGZONE` has no `SP_FAIL_*` activity, so it writes no failure row of its own, and `SP_FAIL_LDZ_AUDIT_PIPELINE` labels a landing-zone failure `"BRZ failed"` | Landing zone has its own `SP_FAIL_AUDIT_PIPELINE`; the label no longer collides | [#257](https://github.com/edkreuk/FMD_FRAMEWORK/pull/257), [#255](https://github.com/edkreuk/FMD_FRAMEWORK/pull/255) |
| **Failure `LogType` spellings** | Four spellings, and equality was a trap: `PL_FMD_LOAD_BRONZE` wrote `FailPipeline`, `PL_FMD_LOAD_SILVER` wrote `FailPipelineActivity`, and `PL_FMD_LDZ_COPY_FROM_ADLS_01`/`_ADF` wrote `StartCopyAcitvity` (`t` and `v` transposed) | Two: `FailedPipeline` and `FailedCopyActivity`; the `StartCopyActivity` typo is gone from all 11 call sites | [#255](https://github.com/edkreuk/FMD_FRAMEWORK/pull/255), [#259](https://github.com/edkreuk/FMD_FRAMEWORK/pull/259) |
| **Notebook-to-pipeline join** | On `2026.07`, a notebook's `PipelineRunGuid` is a synthetic `uuid4()` matching no pipeline row, so `TriggerGuid` is the notebook-to-layer join to use | Both layer pipelines pass `@pipeline().RunId`, so `PipelineRunGuid` is the layer pipeline's `RunId`: join on it (`TriggerGuid` still works too) | [#251](https://github.com/edkreuk/FMD_FRAMEWORK/pull/251) |
| **Notebook `PipelineParentRunGuid`** | The all-zeros GUID on every notebook row | A real GUID on both layers, though it only repeats the row's own `PipelineRunGuid` and never reaches the invoking `PL_FMD_LOAD_ALL`. Still never the join to use | [#270](https://github.com/edkreuk/FMD_FRAMEWORK/pull/270) |
| **Watermark vs queue insert** | On `2026.07`, `SP_UPDATE_PROCESS` (queue) and `SP_UPDATE_LASTLOADVALIE` (watermark) run in parallel off the copy; under sustained `HTTP 430` a split can advance the watermark without queuing the file, and an incremental delta is lost | `SP_UPDATE_LASTLOADVALIE` `dependsOn` `SP_UPDATE_PROCESS`, so the watermark advances only once the file is queued. The `ASQL_02` volume-split group of `PL_FMD_LDZ_COPY_FROM_ASQL_01` is serialized the same way, so no copy group is left exposed | [#271](https://github.com/edkreuk/FMD_FRAMEWORK/pull/271), [#276](https://github.com/edkreuk/FMD_FRAMEWORK/pull/276) (fix [#258](https://github.com/edkreuk/FMD_FRAMEWORK/issues/258)) |
| **Audit parameterisation** | On `2026.07`, the notebook audit calls paste values into the `EXEC` text unbound, so an exception message containing an apostrophe closes the T-SQL literal early and the audit row is dropped | `build_exec_statement` emits `@Key=?` placeholders and `execute_with_outputs` binds them, so the apostrophe is safe | [#191](https://github.com/edkreuk/FMD_FRAMEWORK/pull/191) |
| **Bronze non-key hash** | `HashedNonKeyColumns` includes the primary key, through a list-comparison bug (harmless for change detection, but the column held more than its name) | Excludes the primary key, as its name says | [#245](https://github.com/edkreuk/FMD_FRAMEWORK/pull/245) |
| **`HashedPKColumn` column order** | Order-sensitive: a source that hands its columns over in a different order hashes a composite key differently, so Silver matches nothing and every SCD-2 record is closed and re-inserted. Single-key entities were never affected | Independent of the source column order | [#252](https://github.com/edkreuk/FMD_FRAMEWORK/pull/252) |
| **Demo data** | `load_demo_data = True` registers the demo entity but does not create the table it points at, so the demo loads nothing | Also creates the table, through `NB_FMD_LOAD_DEMO_DATA` | [#268](https://github.com/edkreuk/FMD_FRAMEWORK/pull/268) (fixes [#256](https://github.com/edkreuk/FMD_FRAMEWORK/issues/256)) |
| **Notebook count** | 10 | 11 (`NB_FMD_LOAD_DEMO_DATA` added) | [#268](https://github.com/edkreuk/FMD_FRAMEWORK/pull/268) |
| **Capacity settings** | Cells 7, 9 and 14 ship with `"Trial-Erwin"`, the author's own capacity name, which you must replace | Placeholders | [#247](https://github.com/edkreuk/FMD_FRAMEWORK/pull/247) |
| **Deployment passes** | Two-pass: run the setup, create `CON_FMD_FABRIC_SQL` against the database the first pass makes, run the setup again | Single pass, filling the three `fabric_sql_sp_*` settings so the connection is created from a service principal | [#248](https://github.com/edkreuk/FMD_FRAMEWORK/pull/248) ([#254](https://github.com/edkreuk/FMD_FRAMEWORK/pull/254) corrects the guide order) |
| **`ENV_FMD` Spark runtime** | `runtime_version: 1.3` | `runtime_version: 2.0` (Fabric Runtime 2.0, Spark 4.1) | [#275](https://github.com/edkreuk/FMD_FRAMEWORK/pull/275) |
| **`ENV_FMD` in the code workspaces** | The setup deploys `ENV_FMD` only into the shared CONFIG workspace (cell 48); each code workspace receives `Notebook` and `VariableLibrary` items but no Environment, and none is set as its default Spark environment (the `deploy_item` Environment branch is commented `Not working yet`) | The setup also deploys `ENV_FMD` into each code workspace (cell 50) and sets it as that workspace's default Spark environment (cell 51, `assign_workspace_environment` runs `fab set {workspace}.workspace -q sparkSettings.environment.name -i ENV_FMD`), so the loaders run on `ENV_FMD` | [#278](https://github.com/edkreuk/FMD_FRAMEWORK/pull/278) |
| **Setup notebook kernel and timeout** | `python3.11`; setup Spark session timeout `1200000` ms (20 min) | `python3.12`; timeout `3600000` ms (60 min) | [#278](https://github.com/edkreuk/FMD_FRAMEWORK/pull/278) |
| **Native Execution Engine numeric types** | The landed parquet is read as-is | Before the Bronze read, `convert_small_numeric_columns_to_int` casts any `ByteType`/`ShortType` (`TINYINT`/`SMALLINT`) columns to `Integer` and re-writes the file, because the Native Execution Engine rejects those types; `spark.native.enabled` is toggled off only for that write | [#279](https://github.com/edkreuk/FMD_FRAMEWORK/pull/279) |

Every behaviour above is merged into `main`. The two follow-ups found while re-checking `main` earlier, [#276](https://github.com/edkreuk/FMD_FRAMEWORK/pull/276) (the `ASQL_02` watermark group) and [#277](https://github.com/edkreuk/FMD_FRAMEWORK/pull/277) (the notebook error-audit `NameError`), have since merged, so no behaviour documented here is still an open defect on `main`.

## Which pin am I on?

There is no version stamp in the deployed items, so read it from behaviour, not from a field:

- **`ENV_FMD`'s `runtime_version`** is the cleanest tell: `1.3` is `2026.07`, `2.0` is `main`.
- **`SELECT DISTINCT LogType FROM logging.PipelineExecution WHERE LogType LIKE 'Fail%'`**: `FailPipeline` or `FailPipelineActivity` means `2026.07`; only `FailedPipeline` means `main`.
- **`branch` in `NB_SETUP_FMD.ipynb`** is what you pinned at deployment: a tag such as `"2026.07"`, or `"main"`.

---

Source: the release-qualified callouts across this documentation, each cited to its own source file; the framework at `1ba7974` (which `2026.07` ships) and at `b5fb08e` (`main`). Pull requests link to `github.com/edkreuk/FMD_FRAMEWORK`.
