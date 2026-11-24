# Data agent
## ADDED Requirements
### Requirement: Durable ingestion
The worker SHALL persist source snapshots and checkpoints atomically and avoid duplicate snapshots.
#### Scenario: Repeated source
- **WHEN** the same dataset content is fetched twice
- **THEN** only one snapshot is stored and the successful check is recorded.
### Requirement: Failure isolation
The worker SHALL retain prior successful checkpoints when a fetch fails.
#### Scenario: Provider failure
- **WHEN** a provider returns an error
- **THEN** the failure is logged and other datasets remain eligible for processing.
### Requirement: AI review
AI proposals SHALL carry evidence and require human approval before publication.
#### Scenario: Missing evidence
- **WHEN** a claim has no evidence
- **THEN** it is not eligible for publication.
