using Npgsql;
namespace EndZone.DataAgent;
public sealed class SnapshotStore(NpgsqlDataSource db)
{
    public async Task SaveAsync(Dataset dataset, Snapshot snapshot, CancellationToken ct)
    {
        await using var conn = await db.OpenConnectionAsync(ct);
        await using var tx = await conn.BeginTransactionAsync(ct);
        await using var cmd = new NpgsqlCommand("""
            INSERT INTO ingestion.snapshots(dataset, content_hash, source_url, payload, row_count)
            VALUES (@name,@hash,@url,@payload,@rows)
            ON CONFLICT (dataset,content_hash) DO NOTHING;
            INSERT INTO ingestion.checkpoints(dataset,content_hash,last_success_at)
            VALUES (@name,@hash,now())
            ON CONFLICT (dataset) DO UPDATE SET content_hash=excluded.content_hash,last_success_at=excluded.last_success_at;
            """, conn, tx);
        cmd.Parameters.AddWithValue("name",dataset.Name);
        cmd.Parameters.AddWithValue("hash",snapshot.Hash);
        cmd.Parameters.AddWithValue("url",dataset.Url);
        cmd.Parameters.AddWithValue("payload",snapshot.Content);
        cmd.Parameters.AddWithValue("rows",snapshot.Rows);
        await cmd.ExecuteNonQueryAsync(ct);
        await tx.CommitAsync(ct);
    }
}
