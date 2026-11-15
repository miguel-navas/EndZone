# EndZone — Product Brief, PRD e base SDD

**Versão:** 0.1 · **Data:** 2026-11-15 · **Estado:** planejamento inicial

## Product Brief (BMAD)
**Visão:** Portal brasileiro de futebol americano com foco inicial na NFL, reunindo jogos, resultados, estatísticas, notícias e conteúdo de equipes e jogadores em uma experiência própria.

**Marca:** END ZONE. **Domínio pretendido:** portalendzone.com.br (disponibilidade informada; registro ainda não confirmado).

**Público:** torcedores brasileiros, iniciantes e experientes.

**Diferencial:** homepage cinematográfica, navegação clara, identidade esportiva própria.

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
- **Banco:** PostgreSQL; uso inicial de Supabase a confirmar.
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

### Critérios de aceite iniciais — home-shell
- Sidebar alterna estados expandido/recolhido sem perder navegação.
- Navegação funciona por teclado e exibe foco.
- Hero preserva composição e identidade aprovadas.
- Layout se adapta a larguras menores sem obstrução permanente de conteúdo.

## Pendências explícitas
- Escolha e licenciamento de provedor de dados esportivos.
- Confirmação do registro de domínio.
- Estratégia de hospedagem e banco inicial.
- Arquivos finais de logo e banner para versionamento.
- Definição de login, notificações, monetização e CMS (não aprovados no MVP).

**Nota:** este documento é uma base de especificação, não indica software já implementado.
