using EndZone.DataAgent;
using Npgsql;
var builder = Host.CreateApplicationBuilder(args);
var connection = builder.Configuration.GetConnectionString("EndZone") ?? throw new InvalidOperationException("Configure ConnectionStrings__EndZone.");
builder.Services.AddSingleton(NpgsqlDataSource.Create(connection));
builder.Services.AddHttpClient<DatasetCollector>(client => { client.Timeout = TimeSpan.FromMinutes(3); client.DefaultRequestHeaders.UserAgent.ParseAdd("EndZoneDataAgent/0.1"); });
builder.Services.AddSingleton<SnapshotStore>();
builder.Services.AddHostedService<IngestionWorker>();
await builder.Build().RunAsync();
