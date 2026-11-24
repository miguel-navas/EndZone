# EndZone — Product Brief, PRD e base SDD

**Versão:** 0.2 · **Data:** 2026-11-24 · **Estado:** requisitos atualizados

## Product Brief (BMAD)
**Visão:** Portal brasileiro de futebol americano com foco inicial na NFL, reunindo jogos, resultados, estatísticas, notícias e conteúdo de equipes e jogadores em uma experiência própria.

**Marca:** END ZONE. **Domínio pretendido:** portalendzone.com.br (disponibilidade informada; registro ainda não confirmado).

**Público:** torcedores brasileiros, iniciantes e experientes.

**Diferencial:** homepage cinematográfica, navegação clara, identidade esportiva própria e comparação estatística histórica entre franquias.

## PRD — Requisitos funcionais
- FR-001: Home com hero, jogos, notícias e destaques.
- FR-002: Calendário, placares, status e detalhes de partidas.
- FR-003: Equipes, conferências AFC/NFC, divisões e elencos.
- FR-004: Perfis de jogadores e estatísticas.
- FR-005: Classificação por conferência e divisão.
- FR-006: Rankings e estatísticas de equipes e atletas.
- FR-007: Playoffs e chaveamento quando aplicável.
- FR-008: Notícias, história e regras do futebol americano.
- FR-009: Menu lateral retrátil: ícone + texto expandido; ícone recolhido.

- FR-010: Comparador Head to Head entre duas franquias distintas, com filtros por temporada, intervalo e fase (regular, playoffs, Super Bowl); pré-temporada excluída por padrão.
- FR-011: Exibir confrontos concluídos, vitórias, derrotas, empates, pontos marcados e sofridos, médias, maior pontuação, sequências e histórico cronológico.
- FR-012: Comparar desempenho geral das equipes independentemente de confrontos diretos; abas Visão geral, Ataque, Defesa, Histórico, Temporadas e Conquistas.
- FR-013: Exibir touchdowns, jardas, turnovers, sacks, interceptações e títulos conforme cobertura da fonte, sem converter ausência em zero.
- FR-014: Coletar histórico e atualizações incrementais, validar, deduplicar e consolidar estatísticas com rastreabilidade.
- FR-015: Identidade estável de franquia através de mudanças de nome e cidade; preservar identidade da equipe na época da partida.

### Critérios de aceite — comparação
- Inverter A/B inverte as métricas correspondentes sem alterar o total de jogos.
- Somar vitórias A, vitórias B e empates reproduz o total de confrontos concluídos.
- Pontos e médias são calculados sobre os jogos elegíveis; média indisponível quando não há jogos.
- Super Bowl é subconjunto dos playoffs, nunca contado duas vezes.
- Filtros respeitam temporada NFL, não apenas ano civil; partidas canceladas ou futuras não entram nos totais.
- Exibir cobertura temporal, fonte, última atualização e estados vazio, parcial, erro e carregamento.
- Testar correções de placar, franquias renomeadas, duplicidades, empates e intervalos sem jogos.
- Não publicar números inventados; estatísticas detalhadas dependem de cobertura comprovada.

## Requisitos não funcionais
- Interface responsiva, acessível por teclado, com contraste e foco visível.
- Carregamento eficiente de imagens e dados; cache conforme atualização das fontes.
- Segurança dos segredos de API e validação de entradas.
- Exibição da origem e do horário de atualização dos dados esportivos.
- Logs estruturados e monitoramento de falhas.

## UX/UI — Decisões aprovadas
- Logotipo END ZONE com capacete e escudo metálico.
- Paleta azul-marinho/preto, verde neon, branco e prata.
- Hero fotorrealista e cinematográfico: estádio noturno iluminado, jogadores em ação e corrida/recepção rumo ao touchdown.
- Sidebar esquerda retrátil.
- **Importante:** arte e logo aprovados na conversa original; os binários ainda não foram incorporados ao repositório.

## Arquitetura proposta
- **Frontend:** React + TypeScript.
- **Backend:** .NET 10, Clean Architecture, DDD aplicado com pragmatismo.
- **Experiência:** BFF para agregação de dados e contratos adequados ao frontend.
- **Persistência:** PostgreSQL para fatos relacionais e estatísticos de todas as temporadas; Supabase como opção inicial, capacidade e conta a confirmar. MongoDB para documentos narrativos; armazenamento de objetos Cloudflare R2 para arquivos brutos. Ver [ADR-001](decisions/ADR-001-data-persistence.md).
- **Analytics:** SQL/C# determinísticos, índices e views materializadas quando justificados por medição; atualização após ingestão validada. IA apenas interpreta resultados com evidência.
- **Agentes:** coleta histórica/incremental, qualidade, agregação estatística, comparações, recordes e arquivamento de arquivos brutos.
- **Integrações:** adaptadores para provedores de dados da NFL; validar licenças, custos e cobertura antes de produção.
- **Infra:** deploy e hospedagem ainda a decidir.

## Organização sugerida
```text
EndZone/
├── docs/
│   ├── product-brief.md
│   ├── prd.md
│   ├── architecture.md
│   └── decisions/
├── openspec/
│   ├── specs/
│   └── changes/
├── frontend/
└── backend/
    ├── src/
    └── tests/
```

## Processo BMAD + OpenSpec + SDD
1. **BMAD:** Product Brief → PRD → UX → arquitetura.
2. **OpenSpec:** especificações verificáveis, cenários e critérios de aceite.
3. **SDD:** implementação orientada pelas especificações aprovadas.
4. **Validação:** testes, revisão visual e rastreabilidade dos requisitos.

### Primeiras mudanças OpenSpec sugeridas
- `home-shell`: estrutura de página, menu lateral e hero.
- `nfl-scoreboard`: jogos e placares.
- `teams-standings`: equipes e classificações.
- `head-to-head-analytics`: comparador histórico e geral, a especificar antes da implementação.

### Critérios de aceite iniciais — home-shell
- Sidebar alterna estados expandido/recolhido sem perder navegação.
- Navegação funciona por teclado e exibe foco.
- Hero preserva composição e identidade aprovadas.
- Layout se adapta a larguras menores sem obstrução permanente de conteúdo.

## Pendências explícitas
- Escolha e licenciamento de provedor de dados esportivos.
- Confirmação do registro de domínio.
- Estratégia de hospedagem, capacidade dos planos gratuitos e credenciais dos serviços; validar cobertura e custo de armazenamento.
- Definir metas mensuráveis de desempenho após benchmark com dados representativos.
- Arquivos finais de logo e banner para versionamento.
- Definição de login, notificações, monetização e CMS (não aprovados no MVP).

**Nota:** este documento é uma base de especificação, não indica software já implementado.
