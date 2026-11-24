# Head-to-head analytics
## ADDED Requirements
### Requirement: Comparison filters
The system SHALL compare distinct franchises using inclusive NFL season ranges and disjoint phase categories regular, postseason excluding Super Bowl, and Super Bowl. The playoffs filter includes both postseason categories; all excludes preseason.
#### Scenario: Super Bowl inclusion
- **WHEN** playoffs or all is selected
- **THEN** a Super Bowl is counted exactly once.
#### Scenario: Invalid selection
- **WHEN** both IDs match or the season range is inverted
- **THEN** validation rejects the request.
### Requirement: Direct encounters
The system SHALL count only completed games with validated scores and the selected pair, computing wins, losses, ties, points for/against, averages, maximum score, home/away wins and longest consecutive winning streak (ties break streaks; neutral games excluded from home/away).
#### Scenario: Reverse selection
- **WHEN** A and B are swapped
- **THEN** per-team metrics swap and encounter count remains unchanged.
#### Scenario: No encounters
- **WHEN** no eligible games exist
- **THEN** counts are zero and averages/maxima are null.
### Requirement: Overall performance
The system SHALL independently aggregate each franchise's eligible games and display separate denominators.
#### Scenario: Unequal schedules
- **WHEN** teams played different numbers of games
- **THEN** averages use each team's own denominator.
### Requirement: Coverage and history
The system SHALL show source, revision, as-of time, coverage and paginated history; missing detailed metrics SHALL remain null or explicitly partial with observed counts.
#### Scenario: Missing yards
- **WHEN** a game has no yardage record
- **THEN** it is not treated as zero yards.
### Requirement: Historical identity and corrections
The system SHALL use stable franchise IDs and historical team names and reflect approved corrections.
#### Scenario: Relocation
- **WHEN** a franchise changes city
- **THEN** prior games remain included with their historical name.
#### Scenario: Corrected score
- **WHEN** an approved score correction is committed
- **THEN** affected comparison projections are invalidated and refreshed.
### Requirement: Accessible comparison UI
The system SHALL provide overview, offense, defense, history, seasons and achievements tabs with responsive keyboard-accessible controls and loading, empty, partial and error states.
#### Scenario: Unavailable data
- **WHEN** the source is unavailable
- **THEN** the UI shows an error or explicitly dated cached result, never fabricated statistics.