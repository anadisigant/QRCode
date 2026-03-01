# Gerador de QR Code Moderno e Seguro

Um aplicativo web rápido, responsivo e seguro para geração de QR Codes permanentes. Construído inteiramente com tecnologias web nativas (Vanilla JS), o gerador opera 100% no navegador (*Client-Side Rendering*), sem a necessidade de um servidor back-end ou banco de dados.

## Funcionalidades

- **Geração Instantânea:** Crie QR Codes para links, textos ou credenciais em tempo real.
- **Zero Armazenamento:** Seus dados e textos não são salvos em nenhum lugar. A privacidade é garantida pelo processamento ser totalmente local.
- **QR Codes Eternos:** Como não há redirecionamento de links por banco de dados, o código gerado codifica o texto puro e nunca expirará.
- **Customização de Cores:** Altere a cor dos blocos do QR Code e sua cor de fundo usando a paleta do sistema.
- **Fundo Transparente:** Exporte o QR Code em formato PNG puro e sem fundo, ideal para adesivar em cima de outras artes e banners publicitários.
- **Download Simplificado:** Salve a imagem gerada no computador com um clique, sem precisar de APIs externas.

## Design System

O visual do aplicativo foi concebido fugindo do estereótipo artificial (Glassmorphism/Dark Mode exagerados), optando por um **Look Corporativo e Orgânico**.
Foi aplicada uma paleta de tons naturais:

- **Background:** Nuances radiais suaves combinando `#F0EDB4`, `#F5F0DA` e `#B4F0B8`.
- **Primary Action (Botões):** Verde floresta escuro (`#597d41`) para botões.
- **Texto e Linhas:** Verde musgo escuro (`#2b3a20`) garantindo alto contraste e leitura suave.
- **Detalhes:** Tons de verde-lima pastel e areia.

## Tecnologias Utilizadas

O projeto adota uma abordagem minimalista de **Vanilla Web**, focado em performance e segurança:

*   **HTML5:** Estruturamento semântico (`<main>`, `<header>`, `<footer>`) e preparado para usabilidade móvel.
*   **CSS3:** Utilizando Custom Properties (Variáveis de Cor CSS), `flexbox` para o layout, sombras adaptadas (`box-shadow`), `calc` e Media Queries (`@media`) tornando tudo perfeitamente Responsivo para smartphones.
*   **Vanilla JavaScript (ES6):** Manipulação de DOM nativa e leitura da tag `<canvas>` (API Canvas HTML5) para recortar o fundo de forma a permitir a transparência do QR Code.
*   **[qrcode.js](https://davidshimjs.github.io/qrcodejs/):** Uma biblioteca *Cross-Browser* super leve (sem dependências como jQuery) responsável por desenhar a matriz bidimensional do Código QR baseada no texto inserido.
*   **Google Fonts:** Tipografia `Inter` importada para uma leitura mais enxuta e corporativa.

## Segurança Aplicada (Pronto para Deploy)

O projeto foi reforçado com metatags visando a segurança no lado do cliente, logo é seguro para ser hospedado num Vercel, Netlify, Github Pages ou S3:
    
- **CSP (Content Security Policy):** Uma regra rigorosa injetada no `<head>` (`default-src 'self'`) que diz ao navegador para carregar scripts apenas dele próprio ou dos CDNs expressamente autorizados (como cdnjs e googleapis). Isso blinda o gerador contra ataques de injeção **XSS (Cross-Site Scripting)**.
- **Sanitização de Input:** Antes do Javascript ler a string para virar matriz QR, criamos uma função pura via API DOM (`sanitizeInput`) que varre e desativa possíveis tags de código que o usuário tentar colar.
- **Anti-Sniffing e No-Referrer:** Proíbe o navegador de tentar adivinhar content-types arriscados, e não vaza headers HTTP para sites externos referidos.

## Como Rodar Localmente

Por se tratar de um projeto Vanilla puro, a barreira de uso é nula:

1. Clone o repositório ou baixe a pasta.
2. Dê um **duplo clique** no arquivo `index.html`.
3. Navegue! Não é preciso instalar `node_modules`, `pip`, nem rodar nenhum tipo de servidor web para que a aplicação e a biblioteca funcionem no seu computador.
