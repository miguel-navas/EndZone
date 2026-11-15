# Spec Delta — portal-navigation

## Purpose

Permitir que fãs brasileiros naveguem pelo EndZone em desktop e dispositivos móveis, reconhecendo o destino atual e a disponibilidade de cada seção.

## ADDED Requirements

### Requirement: NAV-01 Destinos estáveis
O portal MUST oferecer os destinos abaixo, com rótulo pt-BR e indicação acessível da rota ativa. Resultados MUST pertencer a Jogos nesta entrega.

#### Scenario: NAV-01a Acesso a cada destino
- **GIVEN** (DADO) o menu do portal aberto.
- **WHEN** (QUANDO) o usuário ativa qualquer entrada da tabela.
- **THEN** (ENTÃO) a URL corresponde ao caminho indicado, o título principal identifica o destino e exatamente uma entrada tem estado ativo.

| Rótulo | Caminho |
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

#### Scenario: NAV-01b Histórico e acesso direto
- **GIVEN** (DADO) uma rota conhecida acessada diretamente no servidor local de validação.
- **WHEN** (QUANDO) o usuário recarrega a página ou usa voltar/avançar após navegar.
- **THEN** (ENTÃO) o destino e o item ativo continuam correspondendo à URL, sem erro de rota ou perda do shell.

### Requirement: NAV-02 Sidebar retrátil no desktop
Em largura a partir de 1024 pixels CSS, o portal MUST iniciar com sidebar expandida e permitir alternar entre ícone com texto e somente ícone. O controle MUST expor nome acessível e estado expandido. O recolhimento MUST preservar destinos, nomes acessíveis e item ativo.

#### Scenario: NAV-02a Recolher e expandir
- **GIVEN** (DADO) uma rota selecionada na sidebar expandida em desktop.
- **WHEN** (QUANDO) o usuário recolhe e depois expande a sidebar.
- **THEN** (ENTÃO) os rótulos visuais desaparecem e reaparecem, os destinos mantêm nomes acessíveis e a URL e o item ativo não mudam.

#### Scenario: NAV-02b Sessão nova
- **GIVEN** (DADO) uma sessão nova em desktop.
- **WHEN** (QUANDO) o usuário abre o portal.
- **THEN** (ENTÃO) a sidebar inicia expandida; persistência após recarga não é exigida nesta entrega.

### Requirement: NAV-03 Menu móvel sem obstrução permanente
Abaixo de 1024 pixels CSS, o menu MUST iniciar fechado, abrir por controle acessível e fechar por seleção de destino, Escape ou ação de fechar. Enquanto aberto, MUST conter o foco e impedir interação com o fundo. Ao fechar sem navegar, MUST devolver foco ao acionador.

#### Scenario: NAV-03a Abrir e dispensar por teclado
- **GIVEN** (DADO) uma tela móvel e foco no botão de menu.
- **WHEN** (QUANDO) o usuário abre o menu, percorre seus controles com Tab/Shift+Tab e pressiona Escape.
- **THEN** (ENTÃO) o foco fica no menu enquanto aberto, o menu fecha, o foco retorna ao botão e o conteúdo volta a ficar acessível.

#### Scenario: NAV-03b Navegar no móvel
- **GIVEN** (DADO) o menu móvel aberto.
- **WHEN** (QUANDO) o usuário seleciona Jogos.
- **THEN** (ENTÃO) a URL passa a `/jogos`, o menu fecha e o foco vai ao título principal da página Jogos.

#### Scenario: NAV-03c Redimensionar com menu aberto
- **GIVEN** (DADO) o menu móvel aberto.
- **WHEN** (QUANDO) a largura passa para pelo menos 1024 pixels CSS e depois retorna ao móvel.
- **THEN** (ENTÃO) o fundo não permanece bloqueado e o menu móvel retorna fechado, sem prender ou perder o foco em elemento oculto.

### Requirement: NAV-04 Teclado e localização do foco
Todas as ações do shell MUST funcionar por teclado com foco visível. O portal MUST oferecer link de salto ao conteúdo, navegação e conteúdo principal semânticos. Após mudança de rota, MUST atualizar o título do documento e mover foco ao título principal, sem foco oculto atrás de elementos fixos.

#### Scenario: NAV-04a Percurso sem mouse
- **GIVEN** (DADO) o portal carregado sem interação por mouse.
- **WHEN** (QUANDO) o usuário usa Tab, Shift+Tab, Enter e Espaço conforme o controle.
- **THEN** (ENTÃO) consegue saltar ao conteúdo, alternar o menu e abrir destinos; cada posição de foco é visível e os ícones decorativos não criam paradas adicionais.

### Requirement: NAV-05 Disponibilidade e rotas desconhecidas
Rotas de módulos ainda não implementados MUST apresentar título e mensagem “Em preparação”, sem simular dados ou executar consultas. Rotas desconhecidas MUST apresentar “Página não encontrada” e um link funcional para Início.

#### Scenario: NAV-05a Módulo futuro
- **GIVEN** (DADO) que somente `home-shell` está entregue.
- **WHEN** (QUANDO) o usuário abre qualquer destino conhecido diferente de Início.
- **THEN** (ENTÃO) encontra o título correto, “Em preparação” e acesso de retorno, sem listas, resultados ou dados esportivos inventados.

#### Scenario: NAV-05b Caminho inexistente
- **GIVEN** (DADO) o servidor local de validação configurado para acesso direto à aplicação.
- **WHEN** (QUANDO) o usuário abre `/destino-inexistente`.
- **THEN** (ENTÃO) encontra “Página não encontrada”, nenhum item de menu ativo e um link que o leva à home.

### Requirement: NAV-06 Ações futuras no header
O header MUST identificar a marca e mostrar a busca indisponível com explicação visível “Busca em preparação”. MUST NOT oferecer ações de autenticação ou notificações nesta entrega.

#### Scenario: NAV-06a Busca sem serviço
- **GIVEN** (DADO) o header em qualquer rota.
- **WHEN** (QUANDO) o usuário lê ou percorre seus controles.
- **THEN** (ENTÃO) a indisponibilidade da busca é compreensível, nenhuma consulta pode ser enviada e não aparecem botões de login, usuário ou notificações.
