# Benchmarking
## ADDED Requirements
### Requirement: Peer cohorts
The system SHALL support league, conference, division, champions and own historical period references.
#### Scenario: Historical relocation
- **WHEN** conference or division membership changes across seasons
- **THEN** peers are resolved using membership in each selected season.
#### Scenario: Target exclusion
- **WHEN** a peer benchmark is requested
- **THEN** the target franchise is excluded from the reference cohort.
### Requirement: Normalized metrics
The system SHALL offer game-weighted and equal-franchise rates, disclosing denominators and weighting.
#### Scenario: Unequal sample sizes
- **WHEN** one peer scores 20 points in one game and another scores 90 in three games
- **THEN** the weighted reference is 27.5 points per game and equal-franchise reference is 25.
#### Scenario: Tied game
- **WHEN** a team has one win, one loss and one tie
- **THEN** its win percentage is 50%.
### Requirement: Coverage
The system SHALL distinguish missing metrics from zero and expose eligible and observed counts, source and revision.
#### Scenario: No eligible peers
- **WHEN** the reference cohort has no observed games
- **THEN** reference and deltas are unavailable, not zero.
### Requirement: Historical comparison
The system SHALL compare the same franchise across explicitly selected target and reference periods.
#### Scenario: Different schedule lengths
- **WHEN** the periods contain different numbers of games
- **THEN** rates use independent denominators.
### Requirement: Rankings and trends
The system SHALL display normalized rankings, scoped records and season trends with documented coverage and tie handling.
#### Scenario: Correction
- **WHEN** an approved result or membership changes
- **THEN** affected benchmark projections are invalidated.
### Requirement: Accessible analytics
The system SHALL expose benchmark filters and results alongside existing comparison modes.
#### Scenario: Partial coverage
- **WHEN** historical detailed statistics are incomplete
- **THEN** the interface labels partial coverage and does not invent values.