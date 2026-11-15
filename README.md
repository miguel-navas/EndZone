# END ZONE

Shell inicial em React/TypeScript, pt-BR. A home contém um hero e seis regiões vazias; as demais seções estão **Em preparação**. Não há integração de dados esportivos.

## Executar

Requer Node.js 22 (validado com 22.15.1) e npm 10.9.2. Em `frontend/`:

```powershell
npm ci
npx playwright install chromium
npm run dev
```

Abra o endereço local informado pelo Vite. Encerre o servidor antes de reinstalar dependências no Windows, pois o processo pode manter `esbuild.exe` em uso.

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
node scripts/verify-assets.mjs
npm run preview
```

O comando E2E gera o build, inicia o servidor de desenvolvimento na porta 4173 e o preview do build na porta 4175, e encerra ambos ao terminar. Deixe essas portas disponíveis. O preview também usa 4173 por padrão; execute-o separadamente. `dist/` é o artefato de produção.

Nesta máquina, o wrapper `npm.ps1` encontra uma restrição ao resolver o perfil. A forma equivalente validada é `node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js'` seguida dos mesmos argumentos. Para os browsers, foi usado `$env:PLAYWRIGHT_BROWSERS_PATH='C:/AI/EndZone/.playwright-browsers'` antes da instalação e dos testes; esse caminho é local e não faz parte do produto.

## Rotas e comportamento

| Destino | Rota |
|---|---|
| Início | `/` |
| Jogos | `/jogos` |
| Temporada | `/temporada` |
| Classificação | `/classificacao` |
| Equipes | `/equipes` |
| Jogadores | `/jogadores` |
| Estatísticas | `/estatisticas` |
| Notícias | `/noticias` |
| NFL Playoffs | `/playoffs` |
| Super Bowl | `/super-bowl` |
| História | `/historia` |
| Regras | `/regras` |

Resultados pertencem a Jogos. Destinos desconhecidos exibem uma página de retorno ao Início. O hosting futuro precisa encaminhar rotas da SPA para `index.html`; Vite dev e preview fazem esse fallback localmente. Nenhum hosting foi escolhido.

A sidebar inicia expandida a partir de 1024 pixels CSS e não persiste o recolhimento. Abaixo disso, o drawer modal contém o foco e isola o fundo. Escape/fechar devolvem foco ao acionador; navegação envia foco ao título principal. Cruzar o breakpoint encerra o drawer e encaminha foco a um controle visível. Futuras páginas devem manter um único `h1` com `tabIndex={-1}`.

## Assets e apresentação

As cinco imagens originais permanecem byte a byte em `frontend/public/assets/`. São referências sem liberação de publicação; `publicDir: false` impede que Vite as copie para `dist/`. A interface usa marca textual END ZONE e fallback CSS. `imagem2.jpg` continua candidata, enquanto `imagem1.png` e as composições com marca/menu não são interface nem logo isolado. A entrada `e2e/hero.html` é uma fixture de teste, não entra no build e não contém dados esportivos.

O contrato local de região é `empty | loading | error`, com vazio por padrão, status por região e recuperação opcional `() => Promise<void>`. Uma tentativa bloqueia ativações adicionais até resolver; sucesso vai a vazio e rejeição retorna a erro. Nenhuma requisição, timer ou fixture é ativada na aplicação normal.

Versões fixadas e evidências por cenário: [validação](docs/home-shell-validation.md). As capturas em `docs/evidence/` apoiam a revisão visual; aceite humano final permanece pendente. Não houve publicação ou arquivamento.
