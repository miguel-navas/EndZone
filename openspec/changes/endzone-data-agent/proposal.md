# EndZone Data Agent — revised under ADR-001
## Why
Collect historical NFL data and maintain it incrementally without coupling the portal to external providers.
## Scope
.NET 10 worker, approved nflverse adapter, historical backfill, incremental updates, normalized PostgreSQL facts for all seasons, object storage for raw snapshots, MongoDB for reviewed narrative documents, durable checkpoints, quality and reconciliation, deterministic analytics and records, AI review contracts.
## Boundaries
Existing PostgreSQL snapshot collector is provisional. No season-based relocation of facts, no live provider or AI credentials assumed, no autonomous AI publication. MongoDB/R2 activation can be staged. See docs/architecture/data-model.md.