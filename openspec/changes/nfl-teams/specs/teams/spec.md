# Teams
## ADDED Requirements
### Requirement: Catalog
The catalog SHALL expose all 32 franchises grouped by conference and division.
#### Scenario: Filter conference
- **WHEN** NFC is selected
- **THEN** only its 16 teams appear.
### Requirement: Profile
The application SHALL expose a profile for each team with seven tabs.
#### Scenario: Missing data
- **WHEN** a tab has no verified data
- **THEN** a pending state appears without fabricated information.
