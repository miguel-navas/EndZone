# Tasks — home-shell

Estado: implementado e verificado localmente; aceite humano final pendente em 5.4. Evidências em docs/home-shell-validation.md. A ordem respeita dependências. Cada grupo inclui seus testes e documentação; a etapa final verifica apenas a integração.

## 1. Aprovação e base executável

- [x] 1.1 Registrar a aprovação explícita de proposal, três specs e design, incluindo menu, fallbacks e tooling D01; verificar que a decisão e eventuais ajustes estão documentados antes de criar código.
- [x] 1.2 Estabelecer um checkout isolado de `miguel-navas/EndZone`, preservando os arquivos locais e conciliando a proposta `home-shell` da branch de documentação; verificar que `git rev-parse --show-toplevel` aponta para o checkout EndZone e que seu diff não contém arquivos de outros projetos. Não fazer merge, remoção ou sobrescrita automática de trabalho divergente.
- [x] 1.3 Inicializar React + TypeScript no diretório `frontend/` sem substituir `public/assets/`, com tooling aprovado em D01 e lockfile; verificar build e checagem de tipos, além da preservação byte a byte das cinco imagens inventariadas.
- [x] 1.4 Configurar os comandos `lint`, `typecheck`, `test`, `build`, `test:e2e` e servidores locais de desenvolvimento/validação; verificar que executam e que o servidor aceita acesso direto às rotas da SPA. Documentar versões escolhidas e comandos reproduzíveis no README, executando cada instrução documentada.

## 2. Navegação e shell acessível

- [x] 2.1 Criar catálogo dos 12 destinos, rotas, estado ativo, título do documento e páginas de seção em preparação/rota desconhecida; verificar NAV-01a/b e NAV-05a/b com testes de todas as entradas, acesso direto e histórico. Documentar o mapa de rotas e o requisito futuro de rewrite do servidor.
- [x] 2.2 Criar sidebar desktop expandida/recolhida, preservando nomes acessíveis e destino ativo; verificar NAV-02a/b em testes de interação, inclusive alternância por teclado e sessão nova sem persistência.
- [x] 2.3 Criar drawer móvel com acionador, fechamento, isolamento do fundo e controle de foco; verificar NAV-03a/b/c no navegador, incluindo Escape, Tab/Shift+Tab, seleção, botão fechar e ida/volta pelo breakpoint de 1024 pixels CSS.
- [x] 2.4 Criar semântica do shell, link de salto, foco visível e foco no título após navegação; verificar NAV-04a e foco após mudança de rota em testes de navegador, sem depender de mouse. Documentar o comportamento de foco para futuras páginas.
- [x] 2.5 Criar header com marca e busca indisponível acompanhada da explicação; verificar NAV-06a por teste de acessibilidade/navegação, sem consultas, login ou notificações fictícios.

## 3. Identidade, hero e responsividade

- [x] 3.1 Aplicar tokens da paleta e marca textual END ZONE em pt-BR, sem biblioteca UI; verificar ID-01a no conteúdo renderizado e nomes acessíveis, além da ausência da marca anterior nos assets selecionados. Registrar tokens e tipografia de sistema na documentação visual.
- [x] 3.2 Criar hero estático com título/descrição HTML e CTA para Temporada; verificar ID-02a com teste que remove imagens e confirma o destino do CTA, sem temporada ou datas presumidas.
- [x] 3.3 Criar slot de imagem proporcional com espaço reservado e fallback, preservando as cinco imagens como referências até liberação; verificar ID-03a/b e ID-05a com imagem controlada de teste, falha de carregamento e ausência de logo isolado. Registrar o asset efetivamente escolhido ou o uso de fallback; avaliar `imagem2.jpg` como candidato, sem publicar o mockup `imagem1.png` como interface. Nenhuma arte final nova é exigida para concluir esta tarefa.
- [x] 3.4 Ajustar layout e contraste para 320, 360, 768, 1024 e 1440 pixels CSS e texto ampliado em 200%; verificar ID-04a/b por inspeção visual e medição de contraste dos estados normal/ativo/foco. Guardar capturas e valores medidos, incluindo hero e página de seção.
- [x] 3.5 Respeitar movimento reduzido; verificar ID-06a no navegador com preferência ativada e registrar que navegação e estado permanecem equivalentes.

## 4. Regiões e disponibilidade da home

- [x] 4.1 Compor as seis regiões sem painéis de dados, com títulos semânticos e vazio por padrão; verificar HOME-01a e HOME-02a em testes da home, sem requests esportivos/editoriais, valores substitutos ou timestamps fictícios.
- [x] 4.2 Criar apresentação isolada de carregamento e status acessível; verificar HOME-03a com estado controlado em teste, confirmando que as outras regiões e a navegação continuam disponíveis. Documentar o contrato de apresentação local D05.
- [x] 4.3 Criar mensagem de erro e retentativa somente quando houver operação fornecida; verificar HOME-04a/b com teste de falha isolada, callback acionado uma vez, loading intermediário, sucesso sem conteúdo para vazio e rejeição de volta a erro.
- [x] 4.4 Manter fixtures apenas em testes ou demonstração identificada; verificar HOME-05a/b com testes de conteúdo e nomes acessíveis, impedindo fixtures no modo normal e exigindo rótulo se uma demonstração for incluída. A demonstração pública é opcional; se não existir, registrar teste de isolamento de fixtures e marcar o cenário demonstrativo como não aplicável com justificativa.

## 5. Verificação integrada e entrega para revisão

- [x] 5.1 Executar o percurso integrado Início → Temporada pelo CTA → Jogos pelo menu → voltar/avançar, incluindo desktop e móvel; verificar correspondência entre URL, título, item ativo e foco, sem console errors ou bloqueio residual do conteúdo.
- [x] 5.2 Executar `lint`, `typecheck`, `test`, `build` e `test:e2e`; verificar sucesso de todos e registrar comandos, ambiente e resultados em `docs/home-shell-validation.md`, vinculando os cenários abaixo às evidências reais. Não declarar testes como executados antes disso.
- [x] 5.3 Conferir a matriz completa e a revisão visual; verificar que nenhuma pendência de aceite está encoberta por teste de snapshot, que assets usados têm situação registrada e que não foram adicionados APIs, segredos, feeds, autenticação ou funcionalidades fora do escopo.
- [ ] 5.4 Apresentar implementação e evidências ao responsável; verificar que a aceitação ou ajustes solicitados estão registrados. Não publicar nem arquivar automaticamente apenas por os testes passarem.

## Matriz SDD — PRD → spec → tarefas → evidência planejada

Os critérios abaixo são condições futuras de aceite. A tabela não é evidência de execução.

| PRD / critério de origem | Requisito e cenários | Tarefas | Teste ou evidência a produzir |
|---|---|---|---|
| PRD-HS-01 / FR-009 / CA01 | NAV-01a/b | 2.1, 5.1 | 12 rotas, histórico, acesso direto e item ativo |
| PRD-HS-01 / CA01 | NAV-02a/b | 2.2 | Alternância, nomes acessíveis e estado inicial desktop |
| PRD-HS-04 / CA06 | NAV-03a/b/c | 2.3 | Drawer, Escape/fechar, foco e redimensionamento |
| PRD-HS-04 / NFR / CA06 | NAV-04a | 2.4, 5.1 | Percurso por teclado, salto ao conteúdo e foco após rota |
| PRD-HS-05 / contexto §§3–4 | NAV-05a/b | 2.1 | Em preparação para cada seção; página desconhecida e retorno |
| PRD-HS-05 / contexto §3 | NAV-06a | 2.5 | Busca indisponível sem envio; ausência de ações não aprovadas |
| PRD-HS-02 / CA02 | ID-01a | 3.1 | Marca e idioma em todas as rotas |
| PRD-HS-02 / FR-001 / CA03 | ID-02a | 3.2 | Texto/CTA sem imagem e destino Temporada |
| PRD-HS-02 / CA03 | ID-03a/b | 3.3, 3.4 | Falha de imagem, proporção e composição por largura |
| PRD-HS-04 / NFR / CA06 | ID-04a/b | 3.4 | Reflow, ampliação e medições de contraste |
| PRD-HS-02 / contexto §§2/10 | ID-05a | 3.3 | Logo ausente, fallback e registro de assets |
| PRD-HS-04 / NFR | ID-06a | 3.5 | Preferência de movimento reduzido |
| PRD-HS-03 / FR-001 / CA04 | HOME-01a | 4.1 | Hero e seis regiões com títulos semânticos |
| PRD-HS-03 / CA04/05 | HOME-02a | 4.1 | Vazio sem consultas/dados/timestamps presumidos |
| PRD-HS-03 / CA04 | HOME-03a | 4.2 | Loading local acessível sem bloquear outras regiões |
| PRD-HS-03 / CA04 | HOME-04a/b | 4.3 | Falha isolada e transições de recuperação controladas |
| PRD-HS-03 / CA05 | HOME-05a/b | 4.4 | Integridade do modo normal e identificação de demonstração |
| PRD-DATA-01 / CA07 | Fora do shell | `nfl-data-integration` + `home-dashboard` | Origem e atualização de dados reais, em mudança posterior |
| PRD-DATA-02 / CA08 | Fora do shell | `nfl-data-integration` | Testes de contratos e isolamento de adapters, posteriormente |

## Workflow follow-up

- Após aceite e autorização de conclusão, sincronizar specs e arquivar pela rotina OpenSpec, preservando evidências.
- Propor `home-dashboard` a partir desta base e da lista priorizada; não iniciar no mesmo ciclo sem nova autorização.
