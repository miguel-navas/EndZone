# Proposal — home-shell

Estado: rascunho para aprovação · 2026-11-15. Planejamento apenas.

## Why

O EndZone possui visão de produto e referências visuais, mas nenhuma aplicação navegável. O shell estabelece uma base acessível e responsiva para os módulos futuros, sem depender de um fornecedor NFL nem apresentar dados fictícios como fatos.

Esta proposta consolida a anterior da branch `docs/bmad-openspec-foundation` (`228824e`), preservada no remoto, e incorpora o contexto mestre. Não cria uma mudança paralela.

## What Changes

- Preparar futuramente a base React + TypeScript, com header, sidebar retrátil e navegação pelas 12 entradas do contexto mestre.
- Exibir páginas de seção “Em preparação” para módulos não implementados e uma página para rotas desconhecidas. Resultados pertencem a Jogos.
- Aplicar identidade END ZONE, hero responsivo com texto em HTML e fallback quando não houver imagem final aprovada.
- Reservar regiões da home para classificação, jogos, eventos, notícias, líderes e equipes; destaques ficam no hero. Exibir estados vazio, carregando e erro sem fabricar informações.
- Garantir teclado, foco, nomes acessíveis e navegação móvel sem bloquear permanentemente o conteúdo.
- Exibir busca como indisponível e explicar que será entregue depois; não criar controles de login ou notificações.

### Fora de escopo

Painéis com cards/tabelas e navegação de partidas (`home-dashboard`), APIs reais, backend, BFF executável, banco, busca funcional, conteúdo dos módulos, carrossel, autenticação, notificações, CMS, monetização e deploy. Não alterar nem gerar imagens neste planejamento.

## Capabilities

### New Capabilities

- `portal-navigation`: destinos, estado ativo, sidebar desktop e drawer móvel, navegação por teclado e rotas indisponíveis/desconhecidas.
- `portal-identity`: marca, paleta, hero, conteúdo textual acessível e fallback de assets.
- `home-content-states`: estrutura das regiões da home, estados de disponibilidade independentes e ausência de dados esportivos inventados.

### Modified Capabilities

Nenhuma. O inventário local `openspec/specs/` não contém capacidades publicadas; a proposta remota não era uma spec implementada.

## Impact

Implementação futura em `frontend/`; não há APIs nem contratos públicos existentes a quebrar. Tooling, roteamento e testes estão propostos em `design.md` e sujeitos à aprovação deste pacote; nenhuma biblioteca UI foi escolhida. Assets já presentes serão preservados. Logo isolado segue pendente; `imagem2.jpg` é candidato ao background sem texto. Marca textual e fundo de fallback permitem avançar após aprovação sem tratar composições como logos prontos.

Dependências: aprovação de requisitos/design/tasks, regularização do checkout antes de versionar e confirmação do uso de assets antes de publicação. A arquitetura futura mantém frontend → BFF → contratos internos → adapters, mas não é implementada nesta mudança. Ver [diagnóstico](../../../docs/diagnostico-projeto.md) e [backlog](../../../docs/mudancas-priorizadas.md).
