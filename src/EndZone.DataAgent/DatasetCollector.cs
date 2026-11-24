using System.Globalization;
using System.Security.Cryptography;
using CsvHelper;
namespace EndZone.DataAgent;
public sealed class Dataset
{
    public string Name { get; set; } = "";
    public string Url { get; set; } = "";
    public string Mode { get; set; } = "Incremental";
    public string[] RequiredColumns { get; set; } = [];
}
public sealed record Snapshot(string Hash, byte[] Content, int Rows);
public sealed class DatasetCollector(HttpClient http, IConfiguration config)
{
    public async Task<Snapshot> CollectAsync(Dataset dataset, CancellationToken ct)
    {
        if (!Uri.TryCreate(dataset.Url, UriKind.Absolute, out var uri) || uri.Scheme != "https")
            throw new InvalidOperationException("An approved HTTPS dataset URL is required.");
        using var response = await http.GetAsync(uri, HttpCompletionOption.ResponseHeadersRead, ct);
        response.EnsureSuccessStatusCode();
        var max = config.GetValue("Ingestion:MaxBytes", 25000000);
        await using var input = await response.Content.ReadAsStreamAsync(ct);
        using var output = new MemoryStream();
        var buffer = new byte[81920];
        int read;
        while ((read = await input.ReadAsync(buffer.AsMemory(), ct)) > 0)
        {
            if (output.Length + read > max) throw new InvalidDataException("Dataset exceeds configured limit.");
            output.Write(buffer, 0, read);
        }
        var bytes = output.ToArray();
        using var reader = new StreamReader(new MemoryStream(bytes));
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        if (!await csv.ReadAsync()) throw new InvalidDataException("Empty CSV.");
        csv.ReadHeader();
        var headers = csv.HeaderRecord ?? [];
        if (dataset.RequiredColumns.Any(c => !headers.Contains(c, StringComparer.Ordinal)))
            throw new InvalidDataException("Required CSV columns missing.");
        int rows = 0;
        while (await csv.ReadAsync()) { ct.ThrowIfCancellationRequested(); rows++; }
        if (rows == 0) throw new InvalidDataException("No records.");
        return new Snapshot(Convert.ToHexString(SHA256.HashData(bytes)), bytes, rows);
    }
}
