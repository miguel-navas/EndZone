# Proposal — home-dashboard

## Why
O menu lateral e o cabeçalho fixo do EndZone já foram aprovados. A próxima entrega deve completar o conteúdo da homepage sem redesenhar esses elementos.

## What Changes
- Preservar o header fixo e a sidebar retrátil da branch `feature/homepage-v05`.
- Integrar o hero END ZONE usando a arte aprovada e um fallback legível.
- Estruturar cards de jogos da semana, classificação AFC/NFC, notícias, líderes e equipes.
- Preparar interfaces para dados reais, sem inventar placares, rankings ou notícias.
- Implementar estados de carregamento, vazio e erro e responsividade.

## Out of Scope
- Trocar a arquitetura ou redesenhar navegação aprovada.
- Autenticação, notificações, CMS ou monetização.
- Publicar dados reais antes de validar fornecedor e licenciamento.

## Dependencies / Risks
- Verificar presença e direitos dos assets finais no repositório.
- Revisar componentes já implementados antes de modificar.
- Definir fonte de dados e contratos antes da integração com backend.

## Acceptance
O conteúdo da home não fica oculto pelo header/sidebar; navegação permanece funcional; seções têm estados acessíveis; identidade visual aprovada é preservada.
