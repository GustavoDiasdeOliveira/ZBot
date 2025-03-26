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
          <div class="msg-img" style="background-image: url(src/images/${isUser ? "user.jpeg" : "bot.jpg"
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
      addMessage(
        "Olá! Escolha uma opção: <br> 1️⃣ Varredura e Pesquisa de Site <br> 2️⃣ Master <br> 3️⃣ Calculadora PP <br> 4️⃣ Encarte <br> 5️⃣ Bonus 🚪",
      );
    });
  }
  
  // Função para lidar com a escolha do usuário
  function handleUserChoice(choice) {
    let response = "";
  
    // Normaliza a escolha do usuário para facilitar a comparação (tudo minúsculo)
    const normalizedChoice = choice.toLowerCase();
  
    // Verifica se a opção é "0" para voltar ao início
    if (normalizedChoice === "0" || normalizedChoice.includes("voltar")) {
      addMessage("🔄 Voltando...", false); // Mensagem do bot indicando que está voltando
      setTimeout(() => {
        startChat();
      }, 2500); // Pequeno atraso para simular transição
      return;
    }
  
    // Lógica para o início do chat
    if (currentStep === "inicio") {
      if (normalizedChoice === "1" || normalizedChoice.includes("varredura")) {
        response =
          "📌 Você escolheu Varredura. Selecione uma opção:<br><br>1️⃣ O que é Varredura?<br>2️⃣ O que é Pesquisa de site?<br>3️⃣ Produtos abreviados <br>4️⃣ Diferença de Unidade e Promoção<br>5️⃣Sobre o Qtd<br>6️⃣Produtos diferentes (Banana, Frango...)<br>7️⃣ Família<br> 0️⃣ Voltar";
        currentStep = "varredura"; // Atualiza o passo para varredura
      } else if (
        normalizedChoice === "2" ||
        normalizedChoice.includes("master")
      ) {
        response =
          "📌 Você escolheu Master. Selecione uma opção:<br><br>1️⃣ Cálculo dos 30%<br>2️⃣ Dúvida na descrição<br>3️⃣ Produtos PP<br>4️⃣ Produtos sem marca (PP)<br>5️⃣ Localização<br> 6️⃣ Descrição Bugada no Danieli<br>7️⃣ PP Danieli <br> 8️⃣ PP Passarela <br>9️⃣ Quais aplicativos usar no Master?<br> 🔟 Como usar a Calculadora PP<br> 0️⃣ Voltar";
        currentStep = "master"; // Atualiza o passo para master
      } else if (
        normalizedChoice === "3" ||
        normalizedChoice.includes("calculadora pp")
      ) {
        response =
          "📌 Você escolheu Pesquisa de site. Selecione uma opção:<br><br>1️⃣ #<br>2️⃣ #<<br>0️⃣ Voltar";
        currentStep = "calculadora pp"; // Atualiza o passo para Pesquisa de site
      } else if (
        normalizedChoice === "4" ||
        normalizedChoice.includes("encarte")
      ) {
        response =
          "📌 Você escolheu Encarte. Selecione uma opção:<br><br>1️⃣ Como subir encarte<br>2️⃣ Como adicionar preço no encarte<br>3️⃣ Como subir encartes de site <br>4️⃣ Como salvar as imagens <br> 0️⃣ Voltar";
        currentStep = "encarte";
      } else if (normalizedChoice === "5" || normalizedChoice.includes("Bonus")) {
        response =
          " 🚪 Você escolheu Bonus. Selecione uma opção:<br><br>1️⃣ Qual é a senha da internet? 🔐😎 <br> 0️⃣ Voltar";
        currentStep = "Bonus";
      } else {
        response = "❌ Opção inválida! Escolha uma das opções acima.";
      }
    }
  
    // Lógica para o passo "varredura"
    else if (currentStep === "varredura") {
      if (normalizedChoice === "1" || normalizedChoice.includes("familia")) {
        response =
          "🔎 Como Funciona a Varredura? <br><br> A <b>varredura</b> é um processo no qual o <b>robô</b> baixa todos os itens de um site de um concorrente. O nosso trabalho, após isso, é associar esses itens aos produtos do nosso cliente dentro do <b>Gestão</b>.<br><br> 📌 Passos para associar os itens:<br> 1.<b>Acesse o Gestão</b> e vá para a seção de <b>Produtos</b>.<br> 2.<b>Busque pelo item do cliente</b> utilizando <b>marca e peso.</b> <br> 3.Após encontrar o item correto, associe-o ao produto do concorrente baixado pela varredura. <br><br>✅ Esse processo ajuda a garantir que todos os itens estejam corretamente identificados e associados para análise.";
      } else if (
        normalizedChoice === "2" ||
        normalizedChoice.includes("o que é pesquisa de site")
      ) {
        response =
          "Como funciona a pesquisa de site?<br>A <b>pesquisa</b> de site é realizada quando precisamos buscar o produto de uma lista específica no site de um concorrente.<br><br> <b>📌 Passos para realizar a pesquisa:</b> <br> 1. Busque o produto pela marca e peso, assim como na <b>varredura. </b> <br> 2.Após localizar o item no site, copie o link do produto <br>3. Coloque o <b>link</b> na <b>planilha</b> ao lado do item solicitado.<br><br>✅ Isso garante que a pesquisa esteja completa e que a referência do produto esteja corretamente associada.";
      } else if (
        normalizedChoice === "3" ||
        normalizedChoice.includes("forma de pesquisar")
      ) {
        response =
          "🔎 Muitos itens possuem abreviações em seus nomes, como <b>IOG</b> para Iogurte, <b>REQ</b> para Requeijão, <b>MAC</b> para Macarrão, entre outros. <br><br> 📌 <b>Dica:</b> Para agilizar a pesquisa, utilize uma abreviação do nome do produto e depois filtre pela <b>marca</b> e pelo <b>peso</b>. <br><br>Exemplo: <b>IOG DANONE 160G.</b>";
      } else if (
        normalizedChoice === "4" ||
        normalizedChoice.includes("produtos un e lv+ pg")
      ) {
        response =
          "Produtos UN e LV+ PG- São diferentes, com famílias diferentes, verifique a Descrição e o EAN para não associar errado.<br><br>";
      } else if (normalizedChoice === "5" || normalizedChoice.includes("qtd")) {
        response =
          "Qtd é coletado apenas como 1.00, na coluna Qtd, é importante verificar se o produto associado está com o Qtd correto. <br><br> <b>Observação:</b> Caso for maior do que 1, não pode ser coletado.";
      } else if (
        normalizedChoice === "6" ||
        normalizedChoice.includes("produtos diferentes")
      ) {
        response =
          "(BANANA PRATA e BANANA IMPORTADA KG), (LIMAO KG e LIMÃO THAITI KG ), (FRANGO C/OSSO e FRANGO S/OSSO) e entre outros... são todos <b>diferentes</b> e não podem ser coletados caso não encontre a descrição correta. <br><br><b>Observação:</b> Caso a descrição do <b>ZROBOT</b> estiver mostrando 500G e no site estiver escrito <b>Preço por quilo</b> Pode coletar o <B>KG</B>";
      } else if (
        normalizedChoice === "7" ||
        normalizedChoice.includes("família")
      ) {
        response =
          "Na precificação de mercados, <b>produto família</b> se refere a um grupo de produtos similares que compartilham características em comum, como <b>marca, categoria, tamanho ou função.</b> Dessa forma, se uma pesquisa listar variantes de um mesmo produto, como <b>Tempero Sazón Carne 60g e Tempero Sazón Frango 60g,</b> mas exibir apenas uma delas, a coleta pode ser realizada, desde que os itens tenham <b>a mesma marca, peso e fragrância.</b><br><br>📌 <b>Atenção:</b> Produtos que possuem variação de <b>tempero,</b> como <b>pipoca</b>, não seguem essa mesma regra. <br> <br> 🔍 <b>Essa orientação também se aplica à Pesquisa de Site</b>. Em caso de dúvida, consulte <b>o assistente, analista ou supervisora.</b>";
      } else {
        response = "❌ Opção inválida! Escolha entre 1 a 7";
      }
    }
  
    // Lógica para o passo "master"
    else if (currentStep === "master") {
      if (normalizedChoice === "1" || normalizedChoice.includes("calculo")) {
        response =
          "🧮 Multiplica-se por 0.70 para reduzir o valor e por 1.30 para aumentá-lo, conforme a margem de lucro.<br><br>";
      } else if (
        normalizedChoice === "2" ||
        normalizedChoice.includes("duvida")
      ) {
        response =
          "❗ Sempre colete os produtos conforme a descrição na planilha, para evitar erros.<br><br>";
      } else if (
        normalizedChoice === "3" ||
        normalizedChoice.includes("produtos pp")
      ) {
        response =
          "👨‍💻 👩‍💻 Use a Calculadora PP para encontrar o menor preço por produto, garantindo o menor preço na coleta. <a href='https://gustavodiasdeoliveira.github.io/Calculadora-PP/'>Calculadora PP</a><br><br><b>Observação: </b> Caso encontre o produto mais barato de acordo com os 30%, pode coletar, mesmo que seja menor que o peso original.";
      } else if (
        normalizedChoice === "4" ||
        normalizedChoice.includes("produtos sem marca")
      ) {
        response =
          "🚫 Produtos sem marca: Produtos KG sem marca não devem ser coletados. Como <b>PEITO FGO C/O CONG. KG, COXA SOBRECOXA C/DORSO CONG. KG </b> e etc. <br><br>Em caso de dúvida, fale com assistente, analista ou com a Supervisora<br><br>";
      } else if (
        normalizedChoice === "5" ||
        normalizedChoice.includes("localizacao")
      ) {
        response =
          "🗺️ Localização no Master: Tudo relacionado ao Danieli é Tepejara/RS, Pesquisa Farma e Passarela é Erechim/RS<br><br>";
      } else if (
        normalizedChoice === "6" ||
        normalizedChoice.includes("Descrição Bugada no Danieli")
      ) {
        response =
          "🤔 Em caso de Descrição Bugada no Danieli, use o anterior e o sucessor como referência, em caso de dúvidas, fale com superior.<br><br>";
      } else if (
        normalizedChoice === "7" ||
        normalizedChoice.includes("PP Daniel")
      ) {
        response =
          "🤠 PP Danieli, será usado <b>APENAS</b> o NFG com a localização Tapejara loja Atacarejo";
      } else if (
        normalizedChoice === "8" ||
        normalizedChoice.includes("PP Passarela")
      ) {
        response =
          "😀 PP Passarela, é o único que tem que mostrar a evidência, tirando print da tela inteira, mostrando a Descrição da planilha, o produto se foi coletado no Baita Busca ou On Passarela e mostrando o horário. Em caso de dúvida, fale com assistente, analista ou com a Supervisora";
      } else if (
        normalizedChoice === "9" ||
        normalizedChoice.includes("Quais aplicativos usar no Master?")
      ) {
        response =
          "📍 Danieli: NFG com a localização <b>Tapejara loja Atacarejo</b>, Farma erechim: NFG com a localização <b>Erechim/RS</b>, Busca Preço e Gondola: Baita Busca e NFG com a localização <b>Erechim/RS</b> e PP Passarela: NFG com localização <b>Erechim/RS e On Passarela</b> ";
      } else if (
        normalizedChoice === "10" ||
        normalizedChoice.includes("Como usar a Calculadora PP?")
      ) {
        response =
          "😉 Adicione o peso, a quantidade é 1, e escolha Gramas, Ml ou Kg, e calcule. Vai mostrar o mínimo e o máximo dos 30%. <br><br> <b>Observação:</b> Caso seja apenas Unidade, preencha apenas a <b> quantidade.</b>";
      } else {
        response = "❌ Opção inválida! Escolha entre 1 a 10.";
      }
    }
  
    // Lógica para o passo "calculadora pp"
    else if (currentStep === "Calculadora PP") {
      if (normalizedChoice === "1" || normalizedChoice.includes("#")) {
        response =
          "#";
      } else if (
        normalizedChoice === "2" ||
        normalizedChoice.includes("descricao")
      ) {
        response =
          "#";
      } else {
        response = "❌ Opção inválida! Escolha apenas a primeira opção.";
      }
    }
  
    // Lógica para o passo "Encarte"
    else if (currentStep === "encarte") {
      if (
        normalizedChoice === "1" ||
        normalizedChoice.includes("Subir encarte")
      ) {
        response =
          "🤔 Primeiro Loga no <b>Zukkin ADM</b>, depois procure <b>Qualidade</b> e clica em <b>Ofertas</b>, depois troque <b>Visualizar por Ofertas</b> e clica na seta verde para subir o encarte. Depois segue passo a passo que está pedindo, coloca a <b>bandeira</b>, <b>Origem</b> é sempre <b>Encarte</b>, adicione a <b>Descrição</b>, Caso tenha mais de um <b>Estabelecimento</b> coloca todos. Por fim, coloque a capa com formato JPEG ou PNG no máximo 1MB e o Encarte PDF, feito todos esses passo. <br><br><b>Observação:</b> Não esqueça de preencher todas as informações no Acompanhamento, depois pode subir. Em caso de dúvida, fale com assistente, analista ou com a Supervisora";
      } else if (
        normalizedChoice === "2" ||
        normalizedChoice.includes("Como adicionar preço")
      ) {
        response =
          "📒 Em ofertas, altere a data (Período) de 2 a 6 dias anteriores, depois clique na seta verde e, em seguida procure a descrição do encarte na <b>Busca Rápida</b>. Depois, clique no <b>ícone do lápis</b>.<br> Em seguida, vá em <b>Adicionar Preço</b> e realize a busca normalmente. <br><br> <b>Observação:</b> Todo preço normal é no Campo<b> Promoção,</b> Fidelidade é apenas o <b>cartão da loja, ignorem o Cashback</b> e atacado é apenas <b>Leve mais pague menos e adiciona o Qtd.</b><br><br></b> Em caso de dúvida, fale com assistente, analista ou com a Supervisora.";
      } else if (
        normalizedChoice === "3" ||
        normalizedChoice.includes("Subir encarte site")
      ) {
        response =
          "😉 Procure os encartes do site nas colunas <b>(Links e Link Rede Social)</b> na planilha. Verifique a validade e, caso encontre um encarte do dia em que está trabalhando, pode fazer o processo de salvar as imagens, converter encarte para PDF e subir normalmente o encarte encontrado. <br><br><b>Observação:</b> Verifique se o encarte já foi coletado pelo <b>Discord</b> e no <b>Acompanhamento</b>. Caso não tenha sido coletado, salve o encarte e realize o processo de envio. <br><br> Em caso de dúvida, consulte o assistente, o analista ou a supervisora.";
      } else if (
        normalizedChoice === "4" ||
        normalizedChoice.includes("Como salvar as imagens")
      ) {
        response =
          "😎 Tire um print de todo o encarte e salve-o em JPG ou PNG para conversão em PDF. Em seguida, tire um print para a capa, garantindo que o arquivo tenha no máximo 1MB e esteja em formato JPG ou PNG.<br><br><b>Observação:</b> Utilize o site <a href='https://www.ilovepdf.com/'>iLovePDF.com</a> para converter JPG em PDF. Caso não consiga usar o arquivo JPG na capa, converta-o para PNG no site <a href='https://jpg2png.com/'>jpg2png.com</a>.";
      } else {
        response = "❌ Opção inválida! Escolha entre 1 a 4.";
      }
    }
  
    // Lógica para o passo "Bonus"
    else if (currentStep === "Bonus") {
      if (normalizedChoice === "1" || normalizedChoice.includes("Senha")) {
        response = "🔑 zukkin2025 ou Zukkin2025 em todas as redes 🔑";
      } else {
        response = "❌ Opção inválida! Escolha apenas 1";
      }
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
  
  // Função para alternar o tema de fundo (Dark/Light)
  function toggleBackground() {
    document.body.classList.toggle("dark-theme");
    const changeBgBtn = document.querySelector(".change-bg");
    changeBgBtn.innerHTML = document.body.classList.contains("dark-theme")
      ? '<i class="bx bx-sun"></i>'
      : '<i class="bx bx-moon"></i>';
  }
  
  // Inicializa o chat com a primeira mensagem automaticamente
  startChat();  