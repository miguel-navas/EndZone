CREATE SCHEMA IF NOT EXISTS ingestion;
CREATE TABLE IF NOT EXISTS ingestion.snapshots (
 dataset text NOT NULL, content_hash text NOT NULL, source_url text NOT NULL,
 payload bytea NOT NULL, row_count integer NOT NULL CHECK(row_count > 0),
 collected_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(dataset,content_hash)
);
CREATE TABLE IF NOT EXISTS ingestion.checkpoints (
 dataset text PRIMARY KEY, content_hash text NOT NULL,
 last_success_at timestamptz NOT NULL,
 FOREIGN KEY(dataset,content_hash) REFERENCES ingestion.snapshots(dataset,content_hash)
);
