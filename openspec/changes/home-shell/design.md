# Design — home-shell

Estado: proposta técnica para aprovação · 2026-11-15. Este arquivo não autoriza implementação.

## Context

Ver `proposal.md` para motivação e limites. Não há aplicação ou testes existentes a adaptar. As referências locais são três imagens compostas, um mockup completo (`imagem1.png`) e um background de estádio (`imagem2.jpg`); falta logo isolado. Não há provedor conectado, banco ou backend. A proposta anterior da branch de documentação já previa React/TS, sidebar, hero e estados; este design torna essas decisões verificáveis.

O design é necessário por introduzir a primeira estrutura de aplicação, dependências de tooling e navegação, comportamento móvel e uma fronteira reutilizável de estados para `home-dashboard`.

## Goals / Non-Goals

**Goals:** separar estrutura visual de fontes de dados; centralizar destinos; tornar acessibilidade parte do comportamento; permitir validação visual sem depender de imagens finais ou APIs.

**Non-Goals:** criar modelo de domínio NFL, persistência, contratos HTTP, integração esportiva ou arquitetura distribuída. A direção .NET 10/Clean Architecture/DDD/BFF/PostgreSQL permanece registrada para mudanças posteriores.

## Decisions

### D01 — Aplicação e tooling mínimos propostos

Propor React + TypeScript em `frontend/`, com Vite para execução/build, React Router para navegação, CSS próprio com propriedades de tema, ESLint para lint, Vitest + Testing Library para comportamento de componentes e Playwright para percursos em navegador. Sem biblioteca de componentes, serviço externo ou UI kit. Aprovar este design implica aprovar essas escolhas propostas; versões compatíveis e lockfile serão fixados somente na implementação, sem assumir versões neste planejamento.

Alternativas: framework com renderização no servidor pode ser reconsiderado na mudança editorial/SEO, mas adicionaria decisões de hosting sem necessidade para validar o shell; roteamento manual reduz uma dependência, porém transfere histórico, links e correspondência de rotas para código próprio; biblioteca UI exigiria escolha explícita ainda não feita. A arquitetura deve manter o conteúdo desacoplado para permitir revisão futura de renderização sem reescrever os requisitos.

### D02 — Organização futura e composição

Áreas propostas dentro de `frontend/src/`: `app/` para rotas e composição; `components/layout/` para shell/header/menu; `features/home/` para hero e regiões; `pages/` para home, seção em preparação e rota desconhecida; `styles/` para tokens e layout. São fronteiras de responsabilidade, não arquivos a criar neste turno.

Um único catálogo de destinos contém identificador, caminho, rótulo e ícone decorativo. Sidebar e títulos derivam desse catálogo. O shell permanece montado entre rotas; somente conteúdo principal muda. Rótulo ativo inclui indicador visual e `aria-current`. Novo destino atualiza URL, título do documento e foco no título principal. Resultados não cria uma rota paralela: será um filtro/conteúdo de Jogos em mudança futura.

Alternativa: cada página manter seu menu favoreceria divergência entre rótulos e URLs e duplicação de controle de foco.

### D03 — Responsividade, foco e movimento

Layout desktop a partir de 1024 pixels CSS: sidebar em coluna e conteúdo flexível, expandida ao iniciar; estado de recolhimento apenas em memória. Abaixo desse limite: drawer fechado inicialmente, acionador no header, fundo indisponível enquanto aberto, foco contido, Escape/fechar/seleção encerram o drawer. Propor `dialog` nativo para a apresentação modal, com nomes e gestão de foco testados em navegador. Ao cruzar o breakpoint, fechar modal, liberar bloqueio do fundo e encaminhar foco a controle visível se o anterior desaparecer.

Após seleção de destino, o foco segue para o título da página; ao dispensar sem navegação, volta ao acionador. Link de salto precede o header. Transições decorativas desativadas quando o usuário pede movimento reduzido. Alternativa: menu sobreposto sem semântica modal exigiria implementar e manter isolamento e foco manualmente; menu fixo no móvel reduziria a área útil.

### D04 — Identidade sem dependência de arte final

Tokens semânticos de fundo, superfície, texto, texto secundário, acento, borda e foco representam a paleta aprovada; valores finais serão medidos e ajustados aos contrastes da spec. Tipografia inicial usa fonte de sistema; fonte comercial ou externa exige decisão posterior. Propor espaçamento coerente em múltiplos de 4 pixels e alvos de interação de pelo menos 44 pixels como diretriz visual, sem substituir testes de uso.

O hero usa texto HTML “A central do futebol americano”, descrição editorial sem dados sazonais presumidos e CTA “Explorar temporada” para `/temporada`. Sem carrossel. Marca textual END ZONE no header até haver logo isolado aprovado. O fallback é fundo azul-marinho com iluminação/gradiente discreto feito em CSS, sem imagens novas.

As artes atuais permanecem referências. `imagem1.png` orienta a composição, mas contém a marca antiga NFL Zone, valores esportivos e ações não aprovadas: reconstruir somente a estrutura prevista nas specs, com a marca END ZONE. Não usar o mockup ou o banner com pseudo-menu como imagem de uma interface funcional. Propor `imagem2.jpg` como candidato de background sem texto, sujeito à seleção/liberação; até lá usar fallback. Quando houver arte aprovada, usar proporção reservada, recorte validado por largura e sobreposição de contraste; fallback se o recorte destruir a composição. Textos embutidos nunca substituem controles reais. Usar alternativa vazia para fundo decorativo; logo informativo precisa de nome pertinente, evitando anunciar a marca duas vezes.

Alternativa: encolher a composição inteira como logo torna os detalhes ilegíveis; aplicar a arte inteira como fundo sem revisão cria texto duplicado e aparência de controles falsos. Nenhum asset será editado ou substituído nesta fase.

### D05 — Contrato de apresentação local

Cada região terá identificador estável, título e estado discriminado `empty | loading | error`. `error` pode receber uma ação assíncrona local de recuperação; não recebe payload de exceção para exibição. Não haverá estado `ready` com dados NFL nesta mudança. Mensagens devem ser comunicadas por região sem anunciar toda a home repetidamente.

| Entrada | Saída percebida | Transição |
|---|---|---|
| `empty` | “Conteúdo ainda não disponível” | Estado normal sem integração |
| `loading` | “Carregando conteúdo” e status acessível | Encerrado pela operação local de teste/demonstração |
| `error` sem recuperação | Mensagem amigável, sem botão | Mantém-se erro |
| `error` com recuperação | Mensagem e “Tentar novamente” | Uma ativação → loading; sucesso sem conteúdo → empty; falha → error |

Os seis IDs propostos são `standings`, `games`, `events`, `news`, `leaders`, `teams`; o hero é separado. Uma região com erro não modifica o estado das outras. Desabilitar nova ativação de retentativa durante loading. Por padrão todas iniciam vazias, sem timers de loading, requisições ou fixtures carregadas. Testes exercitam estados e recuperação com operações controladas. Nenhuma tela pública de depuração é exigida.

Em `home-dashboard`, evoluir a apresentação para cards/tabelas e propor o estado com conteúdo em uma spec própria. Em `nfl-data-integration`, definir origem, instante de atualização, indisponibilidade/cache e tradução de contratos para apresentação. Não inventar endpoints nem formatos de DTO nesta entrega.

Alternativa: injetar respostas externas diretamente nas regiões acoplaria o shell a fornecedor ainda não aprovado.

### D06 — Fronteira de dados e segurança

O shell não realiza chamadas esportivas ou editoriais e não armazena segredos. A futura direção é frontend → BFF → serviços/contratos internos → adapters externos; persistência será decidida pela necessidade real. CA07 (fonte/atualização) e CA08 (isolamento de adapters) são verificados nas mudanças de dados, não declarados concluídos aqui.

### D07 — Validação orientada às specs

Testes de componentes cobrem alternância, nomes acessíveis, mensagens e transições controladas de estado. Testes no navegador cobrem todas as rotas, histórico, acesso direto, drawer, foco e navegação por teclado. Revisão visual mede contraste e examina 320, 360, 768, 1024 e 1440 pixels CSS; também texto ampliado em 200%, falha de imagem e preferência de movimento reduzido.

Propor scripts `lint`, `typecheck`, `test`, `build`, `test:e2e` para execução futura. Critério de conclusão: todos passam, cenários da matriz têm evidência e revisão visual não apresenta sobreposição, recorte inadequado ou dados falsos. Não há testes de API nesta mudança sem API. Aprovação de arte e validação visual não são substituídas por snapshots automáticos.

## Risks / Trade-offs

- [Direitos ou arte final pendentes] → fallback aprovado permite validar o shell; publicação com imagens só após liberação registrada.
- [SPA exige fallback de servidor para links diretos] → verificar no servidor local de validação; registrar requisito de rewrite para o futuro hosting. Não escolher host neste pacote.
- [Tokens definitivos não fornecidos] → medir contraste e submeter resultado visual; nenhum compromisso pixel-perfect com imagem de referência.
- [Rotas futuras podem parecer funcionalidades prontas] → páginas “Em preparação” e ausência de dados ou ações falsas.
- [Mudança de breakpoint pode manter foco/bloqueio incorretos] → cenário dedicado em navegador, incluindo retorno ao móvel.
- [Diretório local herda Git de C:/AI] → antes de qualquer commit, estabelecer checkout isolado e conferir que somente arquivos EndZone entram no diff.
- [Preparar todos os módulos agora inflaria o shell] → entregar só destinos e regiões; nenhum domínio, consulta, autenticação ou feed.

## Migration Plan

Sem migração de banco ou API. Após aprovação, implementar em checkout isolado do EndZone, preservando documentos e PNGs atuais. Validar localmente antes de propor publicação. Não fazer deploy nesta mudança. Reversão futura por commit específico da implementação, sem remover o planejamento nem reescrever histórico; nenhum reset destrutivo é necessário.

## Open Questions

Podem ser resolvidas depois sem alterar o contrato do shell: qual arte final liberada ocupará o slot visual; qual domínio/host será usado em publicação; qual provedor, banco gerenciado e política editorial servirão módulos posteriores. Até lá, usar fallback e estados vazios já especificados. Não são pré-requisitos para revisar este pacote.
