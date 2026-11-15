# Mudanças priorizadas

Data: 2026-11-15 · Proposta para aprovação. Ordem por dependências e valor; sem estimativas de prazo. Apenas `home-shell` recebe artefatos completos agora.

| Ordem | Mudança | Resultado e limite | Dependências | Evidência mínima de aceite futuro |
|---:|---|---|---|---|
| 1 | `home-shell` | Base React/TS, identidade, rotas, sidebar, hero e espaços sem dados | Aprovação deste pacote; checkout isolado para versionar | Navegação, teclado, responsividade, fallback e estados passam nos cenários |
| 2 | `home-dashboard` | Composição das seções da home com cards/tabelas e estados independentes | Shell; contrato de apresentação definido aqui; dados reais aguardam integração | Seções previstas, mocks rotulados quando usados em demonstração, falha parcial isolada |
| 3 | `nfl-data-integration` | Validar provedor; contratos internos, BFF .NET 10, adapters, cache e saúde | Escolha explícita e licença do provedor; decisões de persistência/hosting quando necessárias | Origem/atualização, indisponibilidade, limites e isolamento por testes de contrato |
| 4 | `games-schedule` | Jogos por temporada/semana, filtros, status, resultados e detalhe | Integração; IDs e horários confiáveis | Datas com fuso, partidas adiadas/canceladas e vazio/erro cobertos |
| 5 | `season-overview` | Visão da temporada, calendário, fases e eventos confirmados | Jogos + integração | Marcos com fonte; temporada sem eventos não exibe datas inventadas |
| 6 | `standings` | AFC/NFC, divisões, vitórias/derrotas/empates e percentual quando disponível | Integração; critérios de ordenação conhecidos | Empates e dados ausentes cobertos; ordenação fiel à fonte |
| 7 | `teams` | Diretório e perfil, elenco, jogos e estatísticas disponíveis | Integração + jogos; licença de marcas | Equipes cobertas pela fonte, busca local e relações consistentes |
| 8 | `players` | Busca e perfis com equipe, posição e temporada | Equipes + integração | Homônimos, ausência de equipe e estatísticas indisponíveis cobertos |
| 9 | `statistics` | Rankings com categorias, filtros, períodos e unidades | Equipes/jogadores + cobertura validada | Unidade e período explícitos, empates e ausências tratados |
| 10 | `news` | Feed e detalhes autorizados ou links à fonte | Estratégia editorial e direitos; shell | Fonte/data/link verificáveis e ausência de reprodução não autorizada |
| 11 | `playoffs` | Chaveamento, confrontos, resultados e progressão | Jogos + classificação + integração | Vagas indefinidas e fase ainda não iniciada não geram participantes fictícios |
| 12 | `super-bowl` | Evento, participantes, contexto e histórico | Temporada + playoffs + fontes editoriais | Participantes/data apenas confirmados; histórico verificável |
| 13 | `history-rules` | Conteúdo educativo e histórico revisado | Fluxo editorial e fontes; shell | Revisão factual, navegação e acessibilidade; pode antecipar se houver conteúdo aprovado |
| 14 | `global-search` | Busca transversal por equipes, jogadores e notícias | Escopo explícito; módulos e fontes correspondentes | Resultados, vazio, erro, teclado e políticas de consulta cobertos |
| 15 | `operations-hardening` | Consolidar métricas, confiabilidade, segurança e deploy | Ambiente e escopo do MVP definidos | Recuperação, saúde, segredos e deploy verificados antes de publicação |

Preparação de avaliação/licença de dados pode começar paralelamente ao planejamento visual, sem contratar provedor nem acoplar o frontend. Segurança, acessibilidade e testes entram em cada mudança; a última linha não os adia. Busca e Super Bowl foram separados para não desaparecerem do backlog; Temporada deixou de ser apenas uma rota sem responsável.

## Fronteira entre as três primeiras mudanças

- `home-shell`: regiões com título e mensagem de disponibilidade; estados locais verificáveis; não cria placares, rankings, tabelas ou feed.
- `home-dashboard`: apresentação e composição dos módulos; fixtures apenas em testes ou demonstração explicitamente identificada. Antes da integração, a experiência normal continua vazia.
- `nfl-data-integration`: contratos de dados reais e sua proveniência; conecta os consumidores de forma incremental. Cada módulo confirma cobertura antes de exibir conteúdo real.

## Aprovação e rastreabilidade

Esta lista é o backlog proposto, não autorização de execução. Cada mudança futura deve ter seu próprio `proposal.md`, deltas de specs, design quando necessário e tasks verificáveis. A matriz da primeira mudança está em [tasks.md](../openspec/changes/home-shell/tasks.md). CA07 e CA08 do contexto mestre são responsabilidades futuras da integração; CA04/05 são cobertos no shell apenas pelos estados e pela ausência de dados inventados.
