# Data agent
## ADDED Requirements
### Requirement: Durable ingestion
The worker SHALL store immutable raw objects and manifests with checksums and commit normalized facts, publication checkpoint and outbox atomically in PostgreSQL.
#### Scenario: Repeated source
- **WHEN** identical content is fetched twice
- **THEN** the same object and manifest are reused and canonical facts are not duplicated.
#### Scenario: Interrupted publication
- **WHEN** upload succeeds but database transaction fails
- **THEN** retry reuses the verified object and publication checkpoint remains unchanged.
### Requirement: Historical and incremental collection
The worker SHALL maintain separate partition checkpoints, resumable backfill and incremental overlap/reconciliation.
#### Scenario: Restart
- **WHEN** a historical import stops mid-season
- **THEN** it resumes from the last committed partition without duplicate games.
### Requirement: Failure isolation
The worker SHALL retain prior successful checkpoints, log failures and isolate datasets with bounded retries.
#### Scenario: Provider failure
- **WHEN** a provider returns an error
- **THEN** other datasets remain eligible and the failed partition is retried according to policy.
### Requirement: Quality and identity
The worker SHALL resolve stable franchise/game/player identities, quarantine unresolved conflicts and preserve missing values.
#### Scenario: Conflicting score
- **WHEN** sources disagree and precedence cannot resolve the conflict
- **THEN** the last approved result remains published and a review item is created.
### Requirement: Analytics refresh
The worker SHALL emit idempotent revision events for approved fact changes and refresh affected statistics, comparisons and records.
#### Scenario: Correction
- **WHEN** an approved score changes
- **THEN** affected projections are invalidated and rebuilt from canonical facts.
### Requirement: Archive safety
The worker SHALL verify raw archive integrity and SHALL NOT remove canonical facts merely because a season ends.
#### Scenario: Season closure
- **WHEN** a season is finalized
- **THEN** raw objects may be archived while all relational facts remain queryable.
### Requirement: AI review
AI proposals SHALL carry evidence and require human approval before publication.
#### Scenario: Missing evidence
- **WHEN** a claim has no evidence
- **THEN** it is not eligible for publication.
### Requirement: Safe migration
The worker SHALL retain legacy snapshots until verified object copies and manifests are recoverable.
#### Scenario: Checksum mismatch
- **WHEN** a migrated object fails verification
- **THEN** legacy payload remains intact and cleanup is blocked.