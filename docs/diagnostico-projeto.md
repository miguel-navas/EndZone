# Diagnóstico do EndZone

Data: 2026-11-15 · Estado: planejamento para aprovação · Implementação não autorizada.

## Fontes e limites da inspeção

Leitura integral de `../EndZone_OpenSpec_Explorer_Context.txt`, versão 1.0. O arquivo solicitado com sufixo `Contexto.txt` não foi encontrado; o arquivo disponível tem sufixo `Context.txt` e contém o contexto mestre descrito pelo responsável. Foram lidos integralmente `README.md`, `ENDZONE-FOUNDATION.md`, `../openspec/config.yaml` e a proposta remota `openspec/changes/home-shell/proposal.md` da branch `docs/bmad-openspec-foundation`. As cinco imagens disponíveis ao final da inspeção foram examinadas visualmente. Configuração e catálogo BMAD foram consultados; a configuração resolvida define MNavas, EndZone e pt-BR.

O diagnóstico considera arquivos locais em `C:\AI\EndZone` e uma consulta separada ao histórico remoto. A antiga `.publish-checkout` não existe mais. `git rev-parse --show-toplevel` nesta pasta retorna `C:/AI`, que contém outros projetos: este diretório ainda não é um checkout Git independente. Não foram alterados índice, branches, configuração ou arquivos desse repositório pai. A regularização do checkout deve preceder qualquer futuro commit, sem mover ou apagar arquivos existentes automaticamente.

## Resultado executivo

O produto está na fase de contextualização e especificação. Há visão, requisitos iniciais e referências visuais, mas não há aplicação executável, backend, banco, contratos de API, pipeline ou testes de produto. Instalar BMAD/OpenSpec não equivale a implementar capacidades. A primeira entrega proposta é um shell navegável, acessível e responsivo, com identidade END ZONE e espaços honestos para conteúdo ainda indisponível.

## Contextualização BMAD

- Problema: fãs brasileiros precisam consultar e compreender futebol americano sem fragmentar a experiência entre jogos, classificação, estatísticas e conteúdo educativo.
- Público confirmado: iniciantes e fãs experientes; foco inicial na NFL, idioma pt-BR.
- Proposta de valor: centralizar conteúdo confiável em um portal com identidade esportiva própria e navegação clara.
- Jornada inicial proposta: entrar na home, reconhecer a marca, abrir o menu, acessar uma seção e compreender se há conteúdo disponível.
- Resultado verificável de `home-shell`: todas as entradas de navegação funcionam, inclusive por teclado; home legível em telas pequenas; ausência de dados fictícios apresentados como fatos.
- Hipóteses ainda não validadas: impacto comercial da estética premium, demanda por personalização, volume de usuários, metas de audiência, monetização e escopo final do MVP. Não há pesquisa de mercado ou validação com usuários neste levantamento.
- Processo: BMAD contextualiza problema, público e requisitos; OpenSpec formaliza os comportamentos por mudança; SDD liga requisitos a cenários, tarefas e evidências futuras de teste. Artefatos continuam em rascunho até aprovação.

## Inventário observado

| Área | Evidência | Diagnóstico |
|---|---|---|
| README | `../README.md` | Identificação mínima; sem instruções de execução |
| Produto/PRD | `ENDZONE-FOUNDATION.md` | Brief e FR-001 a FR-009 reunidos; não existem PRD, arquitetura ou UX separados |
| BMAD | `../_bmad/`, `../.agents/skills/` | Ferramentas instaladas; `_bmad-output` estava sem documentos de produto |
| OpenSpec local antes deste trabalho | `config.yaml`, `specs/.gitkeep`, `changes/archive/.gitkeep` | Schema `spec-driven`; nenhuma spec normativa ou mudança ativa |
| Frontend | `../frontend/public/assets/` | Cinco imagens locais ao final da inspeção; sem `package.json`, componentes ou testes |
| Backend e dados | Não há `backend/` | .NET 10, BFF, DDD e PostgreSQL são direção aprovada, não software existente |
| Operação | Sem configuração de produto encontrada | Hospedagem, observabilidade, deploy e provedores ainda pendentes |

### Histórico e reconciliação das branches

Consulta remota: `main` em `1abecd3746b75158e345038b6d81b6a9d4bd5eb2`; `docs/bmad-openspec-foundation` em `228824e2a1147afc5b7e75d72118d9cb348387e4`. Ambas derivam de `c4d951c`, que adicionou a base de produto. `main` adicionou as três imagens; a branch de documentação adicionou uma proposta de 59 linhas. A presença das imagens em `main` e ausência delas na outra branch é divergência de histórico, não intenção de remoção.

A proposta anterior permanece preservada no Git remoto. A mudança local usa o mesmo identificador `home-shell`, sem criar uma mudança concorrente. Consolida objetivo, sidebar, hero, estados e responsividade anteriores; acrescenta os artefatos faltantes. Diferenças explícitas: menu passa a seguir o contexto mestre, incluindo Temporada, Jogadores e Super Bowl; Resultados fica dentro de Jogos. Os painéis de dados completos ficam em `home-dashboard`; o shell contém apenas títulos e estados. A afirmação antiga de que não há binários em `ENDZONE-FOUNDATION.md` está desatualizada; o documento original foi preservado e esta nota registra a correção.

### Assets

| Arquivo relativo a `frontend/public/assets/` | Tamanho | Observação |
|---|---:|---|
| `branding/endzone-brand-concept-01.png` | 384898 bytes | Composição com escudo e atletas; não é logo isolado |
| `branding/endzone-brand-concept-02.png` | 420149 bytes | Outra composição com marca e cena esportiva |
| `images/endzone-home-hero.png` | 465999 bytes | Banner com marca, chamada e pseudoitens de menu incorporados à imagem |
| `imagem1.png` | 333572 bytes | Mockup completo com marca antiga NFL Zone, placares/rankings/datas e ações não aprovadas; referência de composição, nunca conteúdo factual |
| `imagem2.jpg` | 277257 bytes | Background de estádio com iluminação verde, sem chamada ou menu embutidos; candidato ao fundo do hero |

As cinco imagens são referências 16:9. As três composições já versionadas incluem marcas esportivas ou representações de atletas. `imagem1.png` e `imagem2.jpg` apareceram entre a inspeção inicial e a conferência final; foram incorporadas ao inventário sem alteração dos arquivos. O mockup não deve ser publicado como interface: sua marca NFL Zone precisa ser substituída por END ZONE nos componentes reais; números, manchetes e datas não são fontes. O estádio de `imagem2.jpg` permite propor fundo separado de textos. Ainda não foi encontrado arquivo fonte de logo nem variante transparente. A inspeção visual não confirma direitos de uso. Para o shell, propõe-se marca textual acessível e fallback de fundo; a arte definitiva depende de seleção e liberação. Não transformar textos embutidos na arte em controles falsos nem copiar conteúdo como dado esportivo.

## Mapa de capacidades e dependências

CONFIRMADO descreve contexto/direção ou arquivo observado, nunca disponibilidade de uma funcionalidade. PROPOSTO descreve o plano. PENDENTE descreve uma decisão ou evidência ausente.

| Módulos | CONFIRMADO | PROPOSTO | PENDENTE / dependência |
|---|---|---|---|
| M01 Shell | React + TS e sidebar definidos no contexto | `home-shell` | Tooling, tokens e rotas propostos precisam de aprovação |
| M02 Home | Seções descritas no contexto | `home-dashboard` após shell | Conteúdo e contratos; estados locais antes de dados reais |
| M03–M05 Jogos, temporada, classificação | Requisitos FR-002/005 | `games-schedule`, `season-overview`, `standings` | Integração, empates, ordenação e fases do provedor |
| M06–M08 Equipes, jogadores, estatísticas | Requisitos FR-003/004/006 | `teams`, `players`, `statistics` | IDs estáveis, cobertura, unidades e temporadas |
| M09 Notícias | FR-008 | `news` | Estratégia editorial e permissão para conteúdo/imagens |
| M10–M11 Playoffs, Super Bowl | FR-007 e contexto mestre | `playoffs`, `super-bowl` | Calendário, participantes e confrontos confirmados |
| M12–M13 História, regras | FR-008 | `history-rules` | Fontes verificáveis e revisão editorial |
| M14 Busca | Campo no contexto mestre | `global-search` | Escopo, indexação, fonte e critérios; nenhuma busca funcional no shell |
| M15 Integrações | .NET 10 + BFF + adapters, PostgreSQL como direção | `nfl-data-integration` | Provedor, licença, cobertura, custo, quotas; Supabase não confirmado |
| M16 Operação | Segurança e qualidade requeridas | `operations-hardening` | Hosting, recursos da VM, ambientes e deploy; controles básicos acompanham cada mudança |

## Complemento rastreável do PRD para o shell

Preserva FR-001 a FR-009 da base. Identificadores abaixo complementam a base, sem fingir que já estavam aprovados.

| ID | Necessidade | Origem |
|---|---|---|
| PRD-HS-01 | Rotas reconhecíveis e sidebar retrátil, com estado ativo | FR-009; contexto §§3–4; CA01 |
| PRD-HS-02 | Identidade END ZONE e hero responsivo com fallback | FR-001; decisões UX; CA02/03 |
| PRD-HS-03 | Home com regiões e estados loading/vazio/erro, sem dados fictícios | FR-001; contexto §§3/8; CA04/05 |
| PRD-HS-04 | Uso por teclado, foco visível e conteúdo sem obstrução | NFR da base; contexto §6; CA06 |
| PRD-HS-05 | Busca e módulos futuros não aparentam estar implementados | Contexto §§3/5/10 |
| PRD-DATA-01 | Origem e atualização identificáveis nos dados reais | NFR; CA07; entrega na integração/dashboard |
| PRD-DATA-02 | Adapters externos isolados de contratos internos | Arquitetura; CA08; entrega na integração |

## Riscos e decisões para aprovação

1. Confirmar a consolidação da proposta remota com o menu do contexto mestre e os limites shell/dashboard.
2. Aprovar o design proposto: rotas amigáveis, sidebar desktop/drawer móvel, tooling mínimo sem biblioteca de UI e estados de seção.
3. Selecionar assets finais e confirmar direitos antes de publicação. Isso não impede planejamento ou implementação futura com fallback aprovado.
4. Definir provedor e política editorial antes de qualquer feed real. Sem evidência, mostrar indisponibilidade e não inventar dados.
5. Regularizar o checkout local antes de novos commits para evitar envolver outros projetos.
6. Domínio, Supabase, infraestrutura, autenticação, CMS, notificações e monetização seguem pendentes; aprovação do shell não os aprova implicitamente.

## Gate SDD

Revisar [prioridades](mudancas-priorizadas.md), [proposal](../openspec/changes/home-shell/proposal.md), specs, design e tasks. Após aprovação explícita em nova solicitação, implementar conforme os cenários; registrar testes e revisão visual antes de concluir tarefas. Nenhuma caixa de implementação deve ser marcada apenas porque o planejamento passou na validação OpenSpec.

## Verificação deste planejamento

`openspec validate home-shell --strict` passou. O status OpenSpec reconhece os quatro tipos de artefato: proposal, specs, design e tasks. As três specs contêm 17 requisitos e 26 cenários; tasks contém 22 tarefas, todas pendentes. Os links relativos foram conferidos sem destinos ausentes. Isso valida a estrutura documental; testes de aplicação não foram executados porque não existe implementação. Nenhum código de produto, asset, documento original, commit ou push foi produzido por esta etapa.
