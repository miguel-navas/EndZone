# Spec Delta — home-content-states

## Purpose

Preparar a estrutura informativa da homepage sem confundir ausência de integração com resultados esportivos, permitindo comunicar estados independentes de disponibilidade.

## ADDED Requirements

### Requirement: HOME-01 Regiões reconhecíveis
A home MUST apresentar hero de destaque e regiões intituladas Classificação AFC/NFC, Jogos da semana, Próximos eventos, Últimas notícias, Líderes da temporada e Equipes. Cada região MUST possuir título semântico e mensagem de disponibilidade. Nesta mudança MUST NOT conter painéis de dados ou um diretório fictício de equipes.

#### Scenario: HOME-01a Estrutura inicial
- **GIVEN** (DADO) o shell sem integração esportiva ou editorial.
- **WHEN** (QUANDO) o usuário abre Início.
- **THEN** (ENTÃO) encontra o hero e as seis regiões, em ordem de leitura coerente, com mensagens de conteúdo ainda indisponível e sem placares, rankings, notícias ou datas inventados.

### Requirement: HOME-02 Ausência de conteúdo como estado normal
Sem provedor conectado, cada região MUST iniciar em estado vazio com mensagem “Conteúdo ainda não disponível”. MUST NOT mostrar loading permanente, zero como valor substituto de dado ausente, temporada presumida ou horário fictício de atualização.

#### Scenario: HOME-02a Sem integração
- **GIVEN** (DADO) nenhuma fonte conectada.
- **WHEN** (QUANDO) a home termina de montar.
- **THEN** (ENTÃO) cada região apresenta estado vazio, sem consulta externa e sem indicadores que afirmem atualização de dados.

### Requirement: HOME-03 Estado de carregamento
Uma região colocada em carregamento MUST indicar “Carregando conteúdo” com status acessível e manter seu título e espaço reconhecíveis. A simulação desse estado MUST ficar restrita a testes ou demonstração identificada.

#### Scenario: HOME-03a Carregamento isolado
- **GIVEN** (DADO) ambiente de teste que coloca Jogos da semana em carregamento.
- **WHEN** (QUANDO) a home é exibida.
- **THEN** (ENTÃO) essa região informa o carregamento sem fabricar cards de partidas e as demais regiões e a navegação permanecem utilizáveis.

### Requirement: HOME-04 Falha isolada e recuperação honesta
Uma região em erro MUST informar “Não foi possível carregar este conteúdo” de modo acessível, sem expor detalhes técnicos. Retentativa MUST aparecer somente quando existir uma operação real fornecida para executar; falha local MUST NOT derrubar o shell ou as demais regiões.

#### Scenario: HOME-04a Falha sem operação disponível
- **GIVEN** (DADO) ambiente de teste com erro em Últimas notícias e sem ação de recuperação.
- **WHEN** (QUANDO) a região é exibida.
- **THEN** (ENTÃO) apresenta a mensagem de erro, não oferece botão inoperante e preserva a navegação e as demais regiões.

#### Scenario: HOME-04b Nova tentativa verificável
- **GIVEN** (DADO) ambiente de teste com erro e uma operação local de recuperação fornecida.
- **WHEN** (QUANDO) o usuário ativa “Tentar novamente”.
- **THEN** (ENTÃO) a operação é acionada uma vez, a região indica carregamento durante a espera e passa a vazio se não houver conteúdo ou volta a erro se falhar.

### Requirement: HOME-05 Integridade da demonstração
O shell MUST NOT tratar números, nomes de partidas, datas, rankings ou manchetes extraídos de imagens como fatos. Demonstrações com fixtures MUST ter rótulo visível e acessível “Demonstração — dados fictícios”; o modo normal desta entrega MUST continuar sem dados esportivos.

#### Scenario: HOME-05a Experiência normal
- **GIVEN** (DADO) a aplicação no modo normal de `home-shell`.
- **WHEN** (QUANDO) o usuário percorre o conteúdo e os nomes acessíveis.
- **THEN** (ENTÃO) não encontra estatísticas, partidas ou notícias sintéticas apresentadas como informações reais, nem rótulos de “ao vivo” sem fonte.

#### Scenario: HOME-05b Demonstração isolada
- **GIVEN** (DADO) uma demonstração explicitamente ativada fora da experiência normal.
- **WHEN** (QUANDO) fixtures são apresentadas.
- **THEN** (ENTÃO) a identificação de dados fictícios acompanha o conteúdo e não depende apenas de cor ou aviso no código.
