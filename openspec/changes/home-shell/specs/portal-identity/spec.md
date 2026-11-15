# Spec Delta — portal-identity

## Purpose

Tornar a identidade END ZONE reconhecível e legível em diferentes telas, preservando o acesso ao conteúdo mesmo quando assets visuais não estão disponíveis.

## ADDED Requirements

### Requirement: ID-01 Marca e idioma
O portal MUST identificar-se como “END ZONE” em texto acessível, usar pt-BR e a paleta azul-marinho/preto, verde neon, branco e prata. MUST NOT exibir a marca anterior “NFL Zone” na interface ou em assets publicados pelo shell.

#### Scenario: ID-01a Identificação em qualquer rota
- **GIVEN** (DADO) qualquer rota do portal.
- **WHEN** (QUANDO) o usuário visualiza a página ou consulta seus nomes acessíveis.
- **THEN** (ENTÃO) encontra “END ZONE”, conteúdo de interface pt-BR e nenhuma ocorrência da marca anterior.

### Requirement: ID-02 Hero acessível e contextual
A home MUST conter um hero estático com título, descrição e CTA em elementos acessíveis separados da imagem. O CTA MUST ter destino funcional e coerente com seu texto. O hero MUST NOT afirmar temporada, calendário ou resultados não verificados nem oferecer carrossel sem conteúdo real aprovado.

#### Scenario: ID-02a Texto e ação sem imagem
- **GIVEN** (DADO) o hero sem imagem disponível.
- **WHEN** (QUANDO) o usuário lê a chamada e ativa “Explorar temporada”.
- **THEN** (ENTÃO) lê “A central do futebol americano” em texto acessível e chega a `/temporada`, com indicação “Em preparação”.

### Requirement: ID-03 Proporção e fallback visual
O hero MUST preservar proporção da arte sem esticá-la, manter seu texto legível e reservar espaço antes do carregamento. Imagem ausente ou com falha MUST resultar em fundo de fallback sem esconder título ou CTA. Artes com textos embutidos MUST NOT aparentar controles interativos nem servir como único conteúdo textual.

#### Scenario: ID-03a Falha no carregamento
- **GIVEN** (DADO) uma imagem aprovada configurada para o hero.
- **WHEN** (QUANDO) a imagem falha ao carregar.
- **THEN** (ENTÃO) permanecem o espaço do hero, o fundo de fallback, o título e o CTA funcionais, sem ícone de imagem quebrada obstruindo a interface.

#### Scenario: ID-03b Adaptação de composição
- **GIVEN** (DADO) a imagem aprovada disponível.
- **WHEN** (QUANDO) a home é visualizada em 360, 768 e 1440 pixels CSS de largura.
- **THEN** (ENTÃO) a arte não é distorcida, textos e controles não são cortados e o recorte preserva a composição validada; se isso não for possível, usa-se fallback naquela largura.

### Requirement: ID-04 Leitura e reflow
O shell MUST manter contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande e indicadores de controles/foco contra o fundo adjacente. MUST continuar utilizável a 320 pixels CSS e com texto ampliado em 200%, sem rolagem horizontal da página, sobreposição de texto ou perda de controles essenciais.

#### Scenario: ID-04a Tela estreita e ampliação
- **GIVEN** (DADO) a home e uma página de seção.
- **WHEN** (QUANDO) são verificadas a 320 pixels CSS e com texto ampliado em 200% em viewport desktop.
- **THEN** (ENTÃO) os títulos, ações e mensagens permanecem disponíveis sem sobreposição ou rolagem horizontal da página.

#### Scenario: ID-04b Contraste em estados interativos
- **GIVEN** (DADO) textos, botões e links em estados normal, ativo e com foco.
- **WHEN** (QUANDO) seus contrastes são medidos contra os fundos efetivos, inclusive sobre o hero.
- **THEN** (ENTÃO) atingem os mínimos exigidos e o neon não é o único meio de indicar estado ativo ou foco.

### Requirement: ID-05 Uso responsável dos assets
O portal MUST usar fallback quando não houver arte selecionada e liberada para o contexto de publicação. Imagens decorativas MUST ser ignoradas por tecnologia assistiva; imagens informativas MUST ter alternativa textual pertinente. Conceitos compostos MUST NOT substituir silenciosamente um logo isolado.

#### Scenario: ID-05a Logo final indisponível
- **GIVEN** (DADO) as referências atualmente presentes no projeto, sem logo isolado aprovado.
- **WHEN** (QUANDO) o shell é exibido sem aprovação de um logo isolado e da arte de publicação.
- **THEN** (ENTÃO) usa marca textual END ZONE e fundo de fallback, preservando os arquivos originais sem atribuir-lhes status de logo final.

### Requirement: ID-06 Movimento reduzido
O shell MUST respeitar a preferência de movimento reduzido, desativando transições não essenciais sem alterar destinos ou estados de navegação.

#### Scenario: ID-06a Preferência do usuário
- **GIVEN** (DADO) preferência de movimento reduzido ativa.
- **WHEN** (QUANDO) o usuário abre ou recolhe o menu.
- **THEN** (ENTÃO) a mudança ocorre sem animação não essencial e mantém o mesmo resultado funcional.
