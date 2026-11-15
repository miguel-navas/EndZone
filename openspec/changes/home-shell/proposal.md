# Change: home-shell

**Status:** proposta para revisão
**Produto:** EndZone — Portal NFL
**Origem:** Product Brief, PRD e decisões de UX consolidadas em `docs/ENDZONE-FOUNDATION.md`.

## Objetivo
Construir o shell inicial do portal, com identidade visual EndZone, navegação lateral retrátil e homepage com hero cinematográfico.

## Escopo
- Layout React + TypeScript, sem pressupor framework de componentes.
- Sidebar esquerda: expandida com ícones e rótulos; recolhida apenas com ícones.
- Navegação para Home, Jogos, Resultados, Estatísticas, Equipes, Notícias, Classificação, Playoffs, História e Regras.
- Hero responsivo, com logo e imagem de fundo como ativos separados para evitar distorção.
- Estados de carregamento e erro para blocos dependentes de dados.

## Requisitos
### REQ-HOME-001 — Navegação retrátil
O usuário DEVE conseguir expandir e recolher a sidebar com um controle acessível.

**Cenários**
- DADO que a sidebar está expandida, QUANDO o usuário recolhe, ENTÃO apenas ícones e affordances acessíveis permanecem.
- DADO que a sidebar está recolhida, QUANDO o usuário expande, ENTÃO rótulos voltam a ser exibidos.
- DADO que o usuário usa teclado, QUANDO navega pelos itens, ENTÃO foco e nomes acessíveis ficam disponíveis.

### REQ-HOME-002 — Identidade visual
A interface DEVE adotar a paleta aprovada (azul-marinho/preto, verde neon, branco/prata) e reservar espaço para o logo com capacete.

**Cenários**
- DADO que os ativos finais foram disponibilizados, QUANDO a página carrega, ENTÃO logo e hero preservam proporção e legibilidade.
- DADO que a imagem de fundo não carrega, ENTÃO a interface mantém texto legível e fundo de fallback.

### REQ-HOME-003 — Homepage
A home DEVE apresentar espaços para jogos, destaques e notícias, sem fabricar resultados esportivos.

**Cenários**
- DADO que não há dados, ENTÃO a home mostra estado vazio identificável.
- DADO que a fonte retorna dados, ENTÃO o conteúdo indica status e atualização quando disponível.

### REQ-HOME-004 — Responsividade
A navegação e o hero DEVEM adaptar-se a telas menores sem bloquear permanentemente o conteúdo.

## Fora do escopo desta mudança
- Integração real com fornecedor NFL.
- Autenticação, notificações e monetização.
- Implementação do backend, placares e classificações.

## Plano de implementação (SDD)
1. Revisar e aprovar esta especificação.
2. Inicializar frontend React + TypeScript.
3. Implementar componentes de layout e navegação.
4. Integrar ativos visuais aprovados após disponibilização.
5. Criar testes de navegação e acessibilidade.
6. Validar responsividade e critérios de aceite.

## Pendências
- Arquivos finais do logo e hero.
- Tokens definitivos de design e tipografia.
- Definição de biblioteca de roteamento e testes.
