# ADR-001 — Persistência por natureza dos dados

- Estado: Aceita (decisão arquitetural; implementação pendente)
- Data: 2026-11-24
- Referência: [PRD EndZone](../ENDZONE-FOUNDATION.md)

## Contexto
O portal precisa comparar franquias NFL ao longo de todas as temporadas, incluindo confrontos diretos, pontos, vitórias, empates, estatísticas gerais e rankings. A divisão por ano entre MongoDB e PostgreSQL exigiria agregações distribuídas e deduplicação entre bancos. Planos gratuitos têm capacidade limitada.

## Decisão
1. PostgreSQL é a fonte canônica de fatos estatísticos de todas as temporadas: franquias, equipes por época, jogadores, temporadas, jogos, resultados, estatísticas consolidadas e conquistas. Supabase é candidato inicial, sujeito a capacidade e disponibilidade.
2. MongoDB armazena documentos narrativos de estrutura variável: biografias, história, notícias e pesquisas com proveniência. Não é fonte canônica de placares.
3. Cloudflare R2 é candidato a armazenamento de CSV, Parquet, snapshots brutos e backups; validar licenças, custos, retenção e acesso privado.
4. Não migrar partidas encerradas para MongoDB nem apagar fatos estatísticos do PostgreSQL no encerramento de temporada.
5. Usar IDs internos estáveis de franquia, jogador e jogo, mapeamento de IDs externos, restrições de unicidade e ingestão idempotente. Preservar nomes históricos.
6. Calcular estatísticas com SQL/C# determinísticos. Views materializadas e índices serão definidos por benchmark; atualizar projeções após ingestão validada, com versão e horário de atualização.
7. Application define contratos de consulta; Infrastructure implementa repositórios; API/BFF expõe resultados sem revelar detalhes de persistência. Não realizar joins distribuídos no caminho crítico do comparador.
8. Agentes coletam, validam, reconciliam, agregam e arquivam arquivos brutos. IA interpreta resultados com evidência, sem inventar números ou publicar correções sem revisão.

## Alternativas
- Separar histórico e presente por banco: rejeitada por complexidade de consultas e arquivamento.
- PostgreSQL para tudo: viável inicialmente, mas arquivos volumosos e documentos variáveis podem pressionar armazenamento.
- MongoDB para tudo: rejeitada como padrão para fatos relacionais e agregações estatísticas.

## Consequências
Consultas históricas ficam centralizadas; haverá custo operacional de múltiplos serviços, controle de acesso e backups. Não há garantia de caber nos planos gratuitos. MongoDB e R2 podem ser ativados em etapas. Dados ausentes devem ser identificados como indisponíveis, com cobertura e fonte explícitas.

## Implementação e validação
- Atualizar OpenSpec do Data Agent para armazenamento bruto externo e fatos normalizados; a implementação existente de snapshots PostgreSQL permanece provisória até migração validada.
- Especificar head-to-head-analytics com filtros, empates, fases, identidade de franquia e testes de deduplicação.
- Medir volume real, índices, latência e custo antes de definir limites de produção.
- Testar reimportação, correção de placares, atualização de projeções e restauração de backups.
- Não provisionar serviços nem remover dados nesta mudança documental.
