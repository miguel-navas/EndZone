namespace EndZone.DataAgent;
public sealed class IngestionWorker(DatasetCollector collector, SnapshotStore store, IConfiguration config, ILogger<IngestionWorker> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var minutes = Math.Clamp(config.GetValue("Ingestion:PollMinutes",60),1,1440);
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(minutes));
        do
        {
            var datasets = config.GetSection("Ingestion:Datasets").Get<Dataset[]>() ?? [];
            foreach (var dataset in datasets)
            {
                if (stoppingToken.IsCancellationRequested) return;
                if (string.IsNullOrWhiteSpace(dataset.Url)) { log.LogWarning("Dataset {Name} not configured",dataset.Name); continue; }
                try
                {
                    var snapshot = await collector.CollectAsync(dataset,stoppingToken);
                    await store.SaveAsync(dataset,snapshot,stoppingToken);
                    log.LogInformation("Dataset {Name}: {Rows} rows checked",dataset.Name,snapshot.Rows);
                }
                catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { return; }
                catch (Exception ex) { log.LogError(ex,"Dataset {Name} failed; will retry next cycle",dataset.Name); }
            }
        } while (await timer.WaitForNextTickAsync(stoppingToken));
    }
}
