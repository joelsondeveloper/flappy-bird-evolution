# Flappy Bird Evolutivo

![Flappy Bird Evolutivo Screenshot Placeholder](https://via.placeholder.com/800x450?text=Flappy+Bird+Evolutivo)
(Uma imagem ou GIF do projeto em ação seria inserida aqui)

## Descrição do Projeto

Este é um projeto de simulação interativa que explora os princípios da Inteligência Artificial através de Algoritmos Genéticos e Redes Neurais Simples, aplicados ao popular jogo Flappy Bird. No lugar de um jogador humano, uma população de "pássaros" controlados por um único neurônio artificial tentará aprender a passar pelos obstáculos. Através de um processo de evolução simulada (seleção, reprodução com crossover e mutação), os pássaros mais aptos transmitem seus "genes" (os pesos do neurônio) para as próximas gerações, resultando em uma aprendizagem autônoma e na emergência de comportamentos complexos e inteligentes.

O projeto visa ser uma ferramenta educativa e prática para o desenvolvimento de lógica de programação em JavaScript, HTML e CSS, sem o uso de frameworks, focando na construção dos algoritmos do zero.

## Funcionalidades Principais

### Jogo Flappy Bird Base:
*   Pássaro com física de gravidade e capacidade de pular.
*   Geração e movimento contínuo de obstáculos (canos).
*   Detecção de colisão com canos e limites da tela (chão/teto).
*   Sistema de pontuação baseado no número de canos passados.

### Inteligência Artificial (Algoritmo Genético & Neurônio):
*   **Pássaro Inteligente:** Cada pássaro é controlado por um neurônio artificial simples.
    *   **Inputs do Neurônio:**
        *   Distância horizontal até o próximo cano.
        *   Altura vertical do pássaro em relação ao centro da abertura do próximo cano.
        *   Velocidade vertical do pássaro.
    *   **Processamento:** O neurônio realiza uma soma ponderada dos inputs com seus respectivos pesos e um bias.
    *   **Decisão de Pulo:** Se a soma ponderada exceder um limite (threshold), o pássaro executa um pulo.
*   **Evolução da População:**
    *   **População Inicial:** Geração de uma população de pássaros com pesos e biases aleatórios.
    *   **Ciclo de Geração:** Todos os pássaros de uma geração competem no jogo.
    *   **Função de Fitness:** A aptidão de um pássaro é avaliada principalmente pelo número de canos passados e, secundariamente, pelo seu tempo de sobrevivência.
    *   **Seleção:** Os pássaros mais aptos (maior fitness) têm maior probabilidade de serem selecionados como pais para a próxima geração.
    *   **Elitismo:** O pássaro com a melhor fitness de cada geração é copiado diretamente para a próxima (sem mutação), garantindo a preservação do progresso.
    *   **Crossover (Reprodução):** Os "genes" (pesos e biases) de dois pais selecionados são combinados para gerar novos filhos.
    *   **Mutação:** Pequenas alterações aleatórias são introduzidas nos pesos e biases dos filhos, permitindo a exploração de novas soluções.
    *   **Composição da Nova Geração:** A próxima geração é composta pelos filhos gerados e pelos pais que sobreviveram à geração anterior (e que não atingiram o limite de vida).
*   **Longevidade (Vida Total):** Cada pássaro possui uma `idade` que aumenta a cada geração. O usuário pode definir uma `vidaTotal`; ao atingir essa idade, o pássaro é removido da população, simulando um ciclo de vida.
*   **Controle Populacional:** O sistema pode gerenciar um crescimento dinâmico da população, com a possibilidade de definir um limite máximo para evitar sobrecarga de performance.
*   **Desastres Naturais:** Opcionalmente, desastres naturais aleatórios podem ocorrer em certas gerações, introduzindo desafios adicionais à sobrevivência da população.

### Interface do Usuário (UI):
*   **Visualização Clara:** O jogo e a simulação são renderizados em um elemento `<canvas>`.
*   **Parâmetros Configuráveis:**
    *   Número de pássaros na população inicial.
    *   Taxa de mutação.
    *   Número de gerações a simular.
    *   `vidaTotal` (longevidade máxima para um pássaro).
    *   `maxPopulacao` (limite máximo para o tamanho da população).
    *   Chance de desastre natural.
    *   Ferramenta para desenhar e configurar os obstáculos.
*   **Feedback em Tempo Real:** Exibição da geração atual, a pontuação do melhor pássaro e o tamanho da população atual.

## Tecnologias Utilizadas

*   **HTML5:** Estrutura da página e elemento `<canvas>` para renderização.
*   **CSS3:** Estilização da interface.
*   **JavaScript (Vanilla JS):** Toda a lógica do jogo, física, inteligência artificial (neurônios e algoritmo genético) e manipulação do DOM. **Nenhum framework ou biblioteca externa é utilizado**, conforme o objetivo de aprimoramento de lógica.

## Como Usar / Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <link-do-seu-repositorio>
    cd flappy-bird-evolutivo
    ```
2.  **Abra o arquivo `index.html`:**
    Simplesmente arraste e solte o arquivo `index.html` em seu navegador web, ou clique duas vezes nele.
3.  **Explore a Simulação:**
    Ajuste os parâmetros na interface e observe a evolução dos pássaros!

## Desafios e Aprendizados

Este projeto é uma jornada de aprendizado intenso, focado em fortalecer as habilidades de programação e lógica. A implementação do zero de conceitos como física de jogos, redes neurais e algoritmos genéticos em JavaScript puro é o desafio central. As dificuldades incluem a depuração de algoritmos complexos e a otimização de performance para lidar com populações grandes e simulações de longa duração.

## Créditos e Inspiração

*   Inspirado pelo clássico jogo Flappy Bird.
*   Conceitos de neuroevolution popularizados por educadores como Daniel Shiffman (The Coding Train).