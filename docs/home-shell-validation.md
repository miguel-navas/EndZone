# Validação — home-shell

Implementação em `C:/AI/EndZone/.worktrees/home-shell`, branch `codex/home-shell`, base `1abecd3746b75158e345038b6d81b6a9d4bd5eb2`. Execução em Windows, 15/11/2026, Node 22.15.1, npm 10.9.2, Chromium 141.0.7390.37 (Playwright 1.56.1). Aceite humano final pendente; nenhuma publicação ou rotina de arquivamento executada.

## Ambiente e comandos

Versões fixadas no lockfile: React/React DOM 19.2.0, React Router 7.9.6, TypeScript 5.9.3, Vite 6.4.1, plugin React 4.7.0, ESLint 9.39.1/typescript-eslint 8.46.4, Vitest 3.2.4, Testing Library React 16.3.0/user-event 14.6.1, jsdom 26.1.0 e Playwright 1.56.1. Sem UI kit, fontes externas ou serviços esportivos/editoriais.

Em `frontend/`, foram executados:

| Comando | Resultado |
|---|---|
| `npm ci` | 293 pacotes instalados a partir do lockfile |
| `npx playwright install chromium` | Chromium instalado no caminho local indicado no README |
| `npm run lint` | Saída 0, sem findings |
| `npm run typecheck` | Saída 0 |
| `npm test` | 1 arquivo, 6 testes aprovados (após revisão) |
| `npm run build` | Saída 0; 47 módulos; artefato HTML + CSS + JS |
| `npm run test:e2e` | 11 testes aprovados na execução inicial; após revisão, 8 cenários direcionados distintos aprovados em Chromium |
| `node scripts/verify-assets.mjs` | 5 hashes SHA-256 preservados; build sem imagens de referência |
| `npm run preview -- --port 4174` | Resposta HTTP 200 para `/temporada`; fallback SPA preservado |

O npm foi invocado por `node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js'` porque o wrapper PowerShell encontra EPERM ao resolver o perfil. Browser/cache foram direcionados para pastas locais da máquina (README). A instalação limpa foi repetida com sucesso após encerrar o Vite que mantinha `esbuild.exe` em uso. O servidor de testes foi exercitado pelo mesmo Vite usado em `dev`.

O Vitest aprova os testes e retorna 0, mas nesta máquina imprime aviso de encerramento após 10 segundos. O diagnóstico `--reporter=hanging-process` encontrou 23 FILEHANDLE sem stack; nenhuma operação assíncrona da aplicação normal está pendente. Essa limitação do ambiente/tooling fica explícita. O E2E usa um runner com Vite no próprio processo para encerrar o servidor com segurança no Windows, e conclui sem depender do encerramento de árvore de processos via shell.

## Matriz dos cenários

Os nomes referem-se aos testes em `frontend/e2e/shell.spec.ts` e `frontend/src/features/home/home.test.tsx`; os testes executam comportamento e conteúdo, sem snapshots de aprovação automática.

| Cenário | Evidência executada |
|---|---|
| NAV-01a | E2E “todas as rotas”: 12 entradas normativas, URL/título/foco e exatamente um item ativo |
| NAV-01b | Mesmo teste: acesso direto e recarga em cada rota; “percurso integrado”: voltar/avançar |
| NAV-02a | “percurso integrado”: Espaço/Enter recolhem/expandem, preservando nome Jogos e destino |
| NAV-02b | Mesmo teste: recarga reinicia sidebar expandida |
| NAV-03a | “drawer contém foco”: Tab/Shift+Tab nas bordas, Escape, ação fechar e retorno ao acionador; modal nativo isola fundo |
| NAV-03b | Mesmo teste: seleção Jogos fecha drawer, navega e foca h1; CTA/histórico também no móvel |
| NAV-03c | Mesmo teste: 360 → 1024 → 360 com menu aberto, fundo liberado e foco em controles visíveis |
| NAV-04a | “percurso integrado” e “drawer”: link de salto, Enter/Espaço, foco no h1 e teclado no menu |
| NAV-05a | “todas as rotas”: cada uma das onze seções futuras apresenta título e Em preparação |
| NAV-05b | Mesmo teste: rota inexistente, nenhum item ativo, link funcional para Início |
| NAV-06a | “modo normal”: busca explicada, sem campo de envio ou ações de login/notificações; nenhum request externo |
| ID-01a | Marca textual no shell compartilhado; `lang=pt-BR`; teste normal exclui marca anterior; assets de referência excluídos do build |
| ID-02a | Componente “remove imagem quebrada…” e percurso CTA → Temporada |
| ID-03a | E2E “imagem decorativa controlada…”: request abortado, imagem removida, espaço/texto/CTA preservados; captura `hero-image-failure.png` |
| ID-03b | Mesmo teste: SVG decorativo controlado em 360/768/1440, proporção natural 1600×900, object-fit cover, sem overflow; capturas `hero-fixture-*.png` |
| ID-04a | E2E reflow: home e seção em 320/360/768/1024/1440; teste de texto a 200% em 1440; inspeção visual das capturas |
| ID-04b | Medições de contraste abaixo; foco com outline, ativo com faixa/borda e peso tipográfico |
| ID-05a | Marca textual + fundo CSS na experiência normal; manifesto SHA-256 e verificador do build |
| ID-06a | E2E “modo normal”: reducedMotion=reduce, recolhimento equivalente, duração de transição 0s |
| HOME-01a | Componente inicial: hero + seis regiões semânticas; seis mensagens vazias; E2E normal |
| HOME-02a | Mesmo teste: vazio inicial, sem loading/dados/datas; E2E comprova ausência de requests externos |
| HOME-03a | Componente “mantém erro e loading isolados…”: Jogos em loading, Equipes vazia e título preservado |
| HOME-04a | Mesmo teste: Notícias em erro, alerta amigável e ausência de botão sem callback |
| HOME-04b | Componente parametrizado: callback uma vez, loading intermediário, botão desabilitado, resolve → vazio / rejeita → erro |
| HOME-05a | Componente inicial e E2E normal excluem imagens/dados fabricados; revisão de código mantém fixtures fora do entrypoint de produção |
| HOME-05b | Não aplicável: não existe demonstração pública com dados esportivos. Fixture E2E usa somente fundo geométrico de teste e não entra em `dist/` |

## Revisão visual e contraste

Capturas em [`evidence/`](evidence/): `home-{320,360,768,1024,1440}.png`, `temporada-{320,360,768,1024,1440}.png`, `home-text-200.png`, `temporada-text-200.png`, `hero-fixture-{360,768,1440}.png` e `hero-image-failure.png`. Home e seção nas cinco larguras, ambas com texto a 200% e os três tamanhos de imagem controlada foram inspecionados: títulos e CTA legíveis, conteúdo sem sobreposição ou corte e sem rolagem horizontal. Todas as larguras têm também asserção de reflow; avaliação humana final das composições continua disponível.

Contrastes calculados pela luminância relativa sRGB (WCAG), arredondados a duas casas. Amostras do fundo do hero na captura home1440 em `(350,280)`, `(650,400)`, `(320,440)` e `(700,450)` confirmaram RGB `(16,33,53)` / `#102135` atrás da área textual. Nenhuma imagem de referência está aplicada à experiência normal.

| Uso | Frente / fundo | Razão |
|---|---|---|
| Texto principal | `#f4f6fa` / `#090f1b` | 17,71:1 |
| Mensagem secundária | `#b1becf` / `#111c2e` | 9,06:1 |
| Item de navegação normal | `#c1cbd8` / `#0b1423` | 11,24:1 |
| Item ativo (também faixa indicadora) | `#b0f442` / `#1c3028` | 10,56:1 |
| Texto de CTA | `#13200a` / `#b0f442` | 12,81:1 |
| Descrição do hero | `#d3dce7` / `#102135` | 11,74:1 |
| Outline de foco / superfície | `#d3ff85` / `#111c2e` | 14,98:1 |

A fonte inicial é Segoe UI/Arial/sistema (Inter somente se já instalada), sem download. Tokens usam fundo marinho, superfície marinho clara, texto branco/prata e acento verde. Bordas de cards vazios e do grupo de busca são decorativas; ações possuem texto/ícones de alto contraste, foco com outline de 3px e alvos de pelo menos 44px. Não há transições decorativas padrão; a media query de movimento reduzido também desativa animações/transições futuras.

## Assets, integridade e limites

[`home-shell-assets.json`](home-shell-assets.json) registra hashes anteriores à implementação para as cinco referências. O verificador recalcula os hashes e rejeita imagens no build. `imagem2.jpg` foi avaliada como candidata de fundo sem texto pelo pacote aprovado, porém a ausência de liberação mantém o fallback. `imagem1.png` não foi usada; as composições não são logos isolados. A fixture de imagem existe somente em `e2e/`, sem imports pelo app de produção; pedir seu caminho no preview retorna o HTML da SPA, não o conteúdo de teste.

Sem backend, banco, autenticação, notificações, pesquisa funcional, domínio NFL, calls esportivas/editoriais, endpoints ou fixtures sazonais. Não se afirmam fonte/atualização de dados (CA07) ou integração/adapters (CA08). A entrega não valida navegador diferente de Chromium ou leitor de tela real, e não aprova arte futura automaticamente. Hosting futuro exige rewrite de SPA. Aceite humano da implementação, escolha/liberação de arte, publicação e arquivamento permanecem fora desta execução.


OpenSpec: a auditoria independente executou `openspec validate home-shell --strict` com permissão escalada e obteve sucesso. A restrição de resolução do CLI global no sandbox não é pendência de validação.
## Correções após revisão

A verificação dirigida cobriu os oito cenários alterados: cliques modificados preservam o drawer; Back/Forward com histórico criado por links SPA fecha o modal e foca o destino; barras finais são normalizadas preservando query/hash; geometria do header não se sobrepõe a 601/650/768px com texto 200%; rotas usam tabela normativa independente; teclado percorre links com Tab/Shift+Tab e Enter; drawer mantém fechamento/foco; smoke serve o build de produção em home, seção direta e rota desconhecida. As oito regressões passaram em execuções filtradas; a verificação completa posterior pertence à auditoria independente.

A recuperação local passou nos seis testes de componente: os anúncios incluem o título da região e ficam fora de ancestrais ocupados; sucesso mantém foco significativo na mensagem quando o usuário não saiu da operação, e preserva foco movido para outra ação. A API continua baseada em estado inicial e operação opcional, sem estado controlado novo.

O runner E2E gera o build com NODE_ENV=production e inicia preview separado em 4175, além do servidor de desenvolvimento em 4173; ambos são encerrados. O smoke confirma referências a bundles de assets e ausência de react.development.js. Isso executa o artefato gerado sem exigir build manual anterior.
## Auditoria final após revisão independente

Os achados confirmados foram corrigidos e verificados: normalização de barras finais com query/hash, histórico SPA com drawer aberto, cliques modificados, anúncios contextualizados fora do ancestral ocupado, foco após recuperação sem roubo de foco, reflow601/650/768 com texto200, tabela normativa independente, percurso real por Tab/Enter e smoke do bundle de produção. A prop initialState continua inicial por contrato; não foi adicionada API controlada sem consumidor. Nenhum achado foi adiado.

A auditoria principal executou novamente `lint`, `typecheck`, `test`, `build`, `test:e2e` e o verificador de assets: todos retornaram 0. Resultado final: 6 testes de componentes e 16 E2E aprovados. Nesta rodada o Vitest encerrou normalmente em 3,19s, sem reproduzir o aviso histórico de FILEHANDLE descrito acima. O smoke acessou home, seção direta e rota desconhecida pelo preview de produção4175 e verificou o bundle servido. `openspec validate home-shell --strict` também passou com execução elevada.

As 21 tarefas técnicas estão concluídas. A tarefa5.4 permanece pendente para o responsável avaliar esta implementação; aprovação anterior do planejamento não foi tratada como aceite antecipado do código. Prévia de revisão em http://127.0.0.1:5173/ . Sem push, deploy ou arquivamento nesta etapa.
