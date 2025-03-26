// Função para adicionar mensagens no chat
function addMessage(msg, isUser = false) {
  const chat = document.querySelector(".msger-chat");
  const msgElement = document.createElement("div");

  msgElement.classList.add("msg");
  if (isUser) {
    msgElement.classList.add("right-msg");
  } else {
    msgElement.classList.add("left-msg");
  }

  msgElement.innerHTML = `
          <div class="msg-img" style="background-image: url(src/images/${
            isUser ? "user.jpeg" : "bot.jpg"
          });"></div>
          <div class="msg-bubble">
              <div class="msg-info">
                  <div class="msg-info-name">${isUser ? "Zukker" : "Mary"}</div>
                  <div class="msg-info-time">${new Date()
                    .toLocaleTimeString()
                    .slice(0, 5)}</div>
              </div>
              <div class="msg-text">${msg}</div>
          </div>
      `;

  chat.appendChild(msgElement);
  chat.scrollTop = chat.scrollHeight; // Rolagem automática
}

// Função para mostrar o "digitando..." e depois a resposta do bot
function typingIndicator(callback) {
  const chat = document.querySelector(".msger-chat");

  // Adiciona a mensagem "digitando..."
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("msg");
  typingMessage.innerHTML = `
          <div class="msg-img" style="background-image: url(src/images/bot.jpg);"></div>
          <div class="msg-bubble" id="BOT">
              <div class="msg-info">
                  <div class="msg-info-name">Mary</div>
                  <div class="msg-info-time">${new Date()
                    .toLocaleTimeString()
                    .slice(0, 5)}</div>
              </div>
              <div class="msg-text"><span class="dots"><span></span><span></span><span></span></span></div>
          </div>
      `;
  chat.appendChild(typingMessage);
  chat.scrollTop = chat.scrollHeight;

  // Animação dos três pontos
  const dots = typingMessage.querySelector(".dots");
  let dotCount = 0;
  const interval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dots.querySelectorAll("span").forEach((span, index) => {
      span.style.opacity = index + 1 <= dotCount ? 1 : 0.3;
    });
  }, 500);

  // Simula um tempo de "digitando..."
  setTimeout(() => {
    clearInterval(interval); // Para a animação
    chat.removeChild(typingMessage); // Remove a mensagem "digitando..."
    callback(); // Chama a função para adicionar a resposta real do bot
  }, 2000); // Tempo de "..." antes de mostrar a resposta real
}

// Função para limpar o chat
function clearChat() {
  const chat = document.querySelector(".msger-chat");
  chat.innerHTML = ""; // Limpa todo o conteúdo do chat
}

// Função para inicializar o chat com a primeira mensagem do bot
function startChat() {
  currentStep = "inicio"; // Reseta o passo atual para "inicio"
  clearChat(); // Limpa o chat
  typingIndicator(() => {
    addMessage("Olá! Escolha uma opção: <br> 1️⃣ Auditoria <br> 2️⃣ Virtual");
  });
}

// Função para lidar com a escolha do usuário
function handleUserChoice(choice) {
  let response = "";

  // Normaliza a escolha do usuário para facilitar a comparação (tudo minúsculo)
  const normalizedChoice = choice.toLowerCase();

  // Se a opção for "1" (auditoria), redireciona para auditoria.html
  if (normalizedChoice === "1" || normalizedChoice.includes("auditoria")) {
    response = "Carregando...";
    typingIndicator(() => {
      addMessage(response); // Adiciona a resposta antes do redirecionamento
    });

    // Redireciona para a página de auditoria.html após 2 segundos
    setTimeout(() => {
      window.location.href = "auditoria.html";
    }, 5000);
    return;
  }

  // Se a opção for "2" (varredura), redireciona para varredura.html
  if (normalizedChoice === "2" || normalizedChoice.includes("varredura")) {
    response = "Carregando...";
    typingIndicator(() => {
      addMessage(response); // Adiciona a resposta antes do redirecionamento
    });

    // Redireciona para a página de auditoria.html após 2 segundos
    setTimeout(() => {
      window.location.href = "varredura.html";
    }, 5000);
    return;
  }

  // Chama a função que simula "digitando..." e depois exibe a resposta
  typingIndicator(() => {
    addMessage(response); // Adiciona a resposta real do bot
  });
}

// Lida com o envio da mensagem do usuário
document
  .querySelector(".msger-inputarea")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.querySelector(".msger-input");
    const userMessage = input.value.trim();

    if (userMessage) {
      // Adiciona a mensagem do usuário
      addMessage(userMessage, true);

      // Processa a resposta do bot com base na escolha
      handleUserChoice(userMessage);

      // Limpa o campo de entrada
      input.value = "";
    }
  });

// Inicializa o chat com a primeira mensagem automaticamente
startChat();