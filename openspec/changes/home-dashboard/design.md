# Design — home-dashboard

## Baseline
Branch de referência: `feature/homepage-v05`. A branch `codex/home-shell` contém testes e outra implementação: comparar antes de reutilizar, sem sobrescrever o shell aprovado.

## UI
- Manter header fixo e sidebar retrátil; conteúdo principal respeita suas dimensões.
- Hero com proporção adaptativa, overlay para legibilidade e logo como camada independente quando disponível.
- Grid responsivo: jogos, classificação AFC/NFC, notícias, líderes e equipes.
- Ícones da interface por biblioteca consistente (Lucide), nunca emojis de navegação.
- Sem conteúdo estático que pareça resultado real.

## Components (proposta)
`HomePage`, `HeroBanner`, `WeeklyGames`, `StandingsPanel`, `NewsGrid`, `StatLeaders`, `TeamsStrip`, `SectionState`.

## Data contracts (proposta)
Cada seção deve aceitar `loading | ready | empty | error`. Conteúdo ready deve identificar fonte e atualização quando pertinente. Dados mock devem ser explicitamente marcados.

## Quality
Acessibilidade, teclado, foco visível, layout em larguras estreitas, testes de componentes e smoke test visual. Não assumir API funcional.
