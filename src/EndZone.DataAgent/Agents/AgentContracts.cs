namespace EndZone.DataAgent.Agents;
public enum AgentRole { HistoricalResearch, DataQuality, Reconciliation, Editorial, Analytics, Monitoring }
public sealed record Evidence(Uri Source, DateTimeOffset RetrievedAt, string Excerpt);
public sealed record AgentRequest(AgentRole Role, string Subject, IReadOnlyList<Evidence> Evidence);
public sealed record AgentProposal(string Claim, IReadOnlyList<Evidence> Evidence)
{
    public bool RequiresHumanApproval => true;
    public bool HasEvidence => Evidence.Count > 0;
}
public interface IAiAgent
{
    AgentRole Role { get; }
    Task<IReadOnlyList<AgentProposal>> ProposeAsync(AgentRequest request, CancellationToken cancellationToken);
}
// Implementations must never write directly to published domain tables.
