# OpenSpec — Homepage v0.5

## Proposal
Evoluir a homepage do EndZone mantendo cabeçalho fixo e menu lateral aprovado, sem emojis na navegação.

## Requirements
- R1: cabeçalho permanece fixo durante scroll.
- R2: desktop apresenta sidebar independente do conteúdo; modo compacto ajusta a área principal.
- R3: mobile apresenta menu deslizante com overlay, fechamento por toque, seleção ou Escape.
- R4: todos os ícones da navegação são SVG consistentes.
- R5: homepage apresenta hero, jogos, classificação, notícias e equipes.
- R6: não inventar placares, notícias ou disponibilidade em tempo real.
- R7: arte e logotipo originais aprovados devem substituir placeholders quando os arquivos estiverem disponíveis.

## Scenarios
- Dado viewport desktop, quando recolho menu, então conteúdo ganha espaço.
- Dado viewport mobile, quando abro menu, então conteúdo permanece intacto atrás do overlay.
- Dado página longa, quando rolo, então cabeçalho continua visível.
- Dado ausência de API, quando abro jogos, então vejo estado informativo sem dados fictícios.

## Tasks
- [x] Implementar protótipo independente e responsivo.
- [x] Criar SVGs padronizados.
- [x] Preservar cabeçalho fixo.
- [ ] Validar visualmente em navegador desktop e mobile.
- [ ] Integrar assets originais.
- [ ] Migrar componentes aprovados para React + TypeScript.
- [ ] Definir e integrar provedor de dados NFL.
