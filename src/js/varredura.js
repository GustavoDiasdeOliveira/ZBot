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
      "Olá! Escolha uma opção: <br> 1️⃣ Varredura e Pesquisa de Site <br> 2️⃣ Master <br> 3️⃣ Pesquisa PP <br> 4️⃣ Encarte <br> ",
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
      response = `📌 Você escolheu Varredura. Selecione uma opção:<br><br>
      1️⃣ O que é Varredura?<br>
      2️⃣ O que é Pesquisa de site?<br>
      3️⃣ Produtos abreviados<br>
      4️⃣ Itens de embalagem promocional<br>
      5️⃣ Sobre o Qtd<br>
      6️⃣ Produtos Diferentes e Sinônimos<br>
      7️⃣ Família<br>
      0️⃣ Voltar`;
      currentStep = "varredura";

    } else if (normalizedChoice === "2" || normalizedChoice.includes("master")) {
      response = `📌 Você escolheu Master. Selecione uma opção:<br><br>
      1️⃣ Dúvida na descrição<br>
      2️⃣ Quais aplicativos usar no Master?<br>
      0️⃣ Voltar`;
      currentStep = "master";

    } else if (normalizedChoice === "3" || normalizedChoice.includes("pesquisa pp")) {
      response = `📌 Você escolheu Pesquisa PP. Selecione uma opção:<br><br>
      1️⃣ O que é Pesquisa PP?<br>
      2️⃣ Onde é feita a pesquisa?<br>
      3️⃣ Itens de Primeiro Preço (PP) Sem Marca<br>
      4️⃣ Como usar a Calculadora?<br>
      0️⃣ Voltar`;
      currentStep = "Pesquisa PP";

    } else if (normalizedChoice === "4" || normalizedChoice.includes("encarte")) {
      response = `📌 Você escolheu Encarte. Selecione uma opção:<br><br>
      1️⃣ O que é um encarte/jornal?<br>
      2️⃣ Onde são enviados os encartes?<br>
      3️⃣ Como subir encarte?<br>
      4️⃣ Como adicionar preço no encarte?<br>
      5️⃣ Dica para salvar a foto do encarte!<br>
      0️⃣ Voltar`;
      currentStep = "encarte";

    // } else if (normalizedChoice === "5" || normalizedChoice.includes("bonus")) {
    //   response = `🚪 Você escolheu Bonus. Selecione uma opção:<br><br>
    //   1️⃣ Qual é a senha da internet? 🔐😎<br>
    //   0️⃣ Voltar`;
    //   currentStep = "Bonus";
    } else {
      response = "❌ Opção inválida! Escolha uma das opções acima.";
    }
  }

  // Lógica para o passo "varredura"
  else if (currentStep === "varredura") {
    switch (normalizedChoice) {
      case "1":
      case normalizedChoice.includes("varredura") && normalizedChoice:
        response = `🔎 Como Funciona a Varredura?<br><br>
        A <b>varredura</b> é um processo no qual o <b>robô</b> baixa todos os itens de um site 
        concorrente. Após isso, associamos esses itens aos produtos do cliente dentro do <b>Gestão</b>.<br><br>
        📌 <b>Passos:</b><br><br>
        1. Acesse o Gestão e vá para Produtos.<br>
        2. Busque pelo item usando marca e peso.<br>
        3. Associe o item ao produto concorrente baixado.<br><br>
        ✅ Isso garante a correta identificação e associação dos itens.`;
        break;

      case "2":
      case normalizedChoice.includes("pesquisa de site") && normalizedChoice:
        response = `🔍 Como funciona a pesquisa de site?<br><br>
        A <b>pesquisa</b> busca produtos específicos no site do concorrente.<br>
        📌 <b>Passos:</b><br><br>
        1. Busque o produto por marca e peso.<br>
        2. Copie o link do produto encontrado.<br>
        3. Cole o link na planilha ao lado do item.<br><br>
        ✅ Isso assegura uma pesquisa completa e correta.`;
        break;

      case "3":
      case normalizedChoice.includes("produtos abreviados") && normalizedChoice:
        response = `🔎 Muitos produtos têm abreviações como <b>IOG</b> (Iogurte) ou <b>REQ</b> (Requeijão).<br><br>
        📌 <b>Dica:</b> Use abreviações para agilizar a pesquisa e filtre por marca e peso.<br><br>
        Exemplo: <b>IOG DANONE 160G.</b><br><br>
        Clique <a href='https://gustavodiasdeoliveira.github.io/abreviador/' target='_blank'>aqui</a> para abrir o abreviador do Team Virtual.`;
        break;
        
      case "4":
      case normalizedChoice.includes("Itens de embalagem promocional") && normalizedChoice:
        response = `🔎 <b>Produtos com embalagem promocional</b> possuem diferenças importantes: <b>UN (unidade) e LV+ PG- (leve mais, pague menos)</b> 
        pertencem a <b>famílias diferentes.</b> Sempre verifique a <b>descrição</b> e o <b>EAN</b> para garantir a associação correta.`;
        break;

      case "5":
      case normalizedChoice.includes("qtd") && normalizedChoice:
        response = `🔎 O que é Qtd?<br><br>
        <b>Qtd</b> significa <b>quantidade</b> e é a forma como o sistema diferencia itens vendidos por <b>caixa</b> e por <b>unidade.</b>`;
        break;

        case "7":
          case normalizedChoice.includes("familia") && normalizedChoice:
            response = `Na precificação de mercados, <b>produto família</b> se refere a um grupo de produtos similares que 
            compartilham características em comum, como <b>marca, categoria, tamanho ou função.</b><br><br>
            Dessa forma, se uma pesquisa listar variantes de um mesmo produto, como <b>Tempero Sazón Carne 60g</b> e <b>Tempero Sazón 
            Frango 60g</b>, mas exibir apenas uma delas, a coleta pode ser realizada, desde que os itens tenham a <b>mesma marca, peso e fragrância.</b><br><br>
            <b.📌 Atenção:</b> Produtos que possuem variação de <b>tempero</b>, como <b>pipoca</b>, não seguem essa mesma regra.<br><br>
            🔍 Essa orientação também se aplica à Pesquisa de Site. Em caso de dúvida, <b>consulte o assistente, analista ou supervisora.</b>`;
            break;
    
          case "6":
          case normalizedChoice.includes("Produtos Diferentes e Sinônimos") && normalizedChoice:
            response = `🔎 Produtos Diferentes e Sinônimos<br>
            Existem itens que, apesar de parecerem iguais, são <b>produtos diferentes.</b><br><br>
            <b>📌 Exemplos:</b><br>
            <b>1. Banana Prata</b> e <b>Banana Nanica</b> são variedades distintas e não devem ser confundidas.<br>
            2. Produtos <b>com osso</b> e <b>sem osso</b> também são sempre diferentes e <b>não podem ser coletados como equivalentes.</b><br><br>
            Além disso, <b>há itens semelhantes</b>, mas com nomes diferentes dependendo da região. Por exemplo, <b>Coxão mole</b> e <b>Chã de Dentro</b> podem se referir ao mesmo produto.<br>
            🔍 Para esses casos, você pode <b>verificar</b> a <b>similaridade</b> dentro da nossa base de dados, clique aqui: <a href='https://lookerstudio.google.com/u/0/reporting/861c449e-7b93-4e21-ac16-f99021c89015/page/QHJ4D' target='_blank'>Sinonimos Qualidade</a> e
            <a href='https://docs.google.com/spreadsheets/d/1HG1HQ2F7WtbmYY4fT6aLbL5zDvSxf2Wy/edit?gid=2066530975#gid=2066530975' target='_blank'>FLV item compativel</a><br> ou até mesmo consultar informações adicionais no Google. <br>✅ Sempre verifique a descrição e o EAN para garantir a associação correta.`;
            break;

      default:
        response = "❌ Opção inválida! Escolha entre 1 a 7.";
    }
  }


  // Lógica para o passo "master"
  else if (currentStep === "master") {
    if (normalizedChoice === "1" ||
      normalizedChoice.includes("duvida na descrição")
    ) {
      response =
        `<b>🔎 Dúvidas na Descrição?</b><br><br>
        No site do <b>Danieli</b>, alguns itens podem aparecer com a <b>descrição incompleta</b>.<br><br>
        📌 <b>Quando isso ocorrer</b>, use o <b>item anterior e o sucessor</b> como <b>referência</b> para identificar corretamente o produto.<br><br>
        <b>✅ Em caso de dúvidas</b>, consulte seu <b>superior</b> para garantir a associação correta.`;
    } else if (
      normalizedChoice === "2" ||
      normalizedChoice.includes("Quais aplicativos usar no Master?")
    ) {
      response =
        `<b>Localização</b><br><br>
        
        <b>📍Danieli:</b> NFG com a localização <b>Tapejara loja Atacarejo.</b><br>
        <b>📍Farma Erechim:</b> NFG com a localização <b>Erechim/RS.</b><br>
        <b>📍Busca Preço e Gondola:</b> Baita Busca, On Passarela e NFG com a localização <b>Erechim/RS.</b><br>
        <b>📍PP Passarela:</b> Baita Busca com a localização <b>Erechim/RS</b> e <b>On Passarela.</b>`;
    }  else {
      response = "❌ Opção inválida! Escolha uma dessas opções.";
    }
  }

  // Lógica para o passo "Pesquisa PP"
  else if (currentStep === "Pesquisa PP") {
    if (
      normalizedChoice === "1" ||
      normalizedChoice.includes("O que é?")
    ) {
      response =
        `<b>🤔 O que é PP?</b><br><br>
        A pesquisa de <b>produtos de primeiro preço (PP)</b> tem como objetivo ajudar o
        cliente a encontrar <b>novos fornecedores mais baratos</b> e começar a comercializar esses itens.<br><br>
        <b>📌 Na coleta de itens PP</b>, é permitido coletar produtos com até <b>30% de diferença de preço</b> em relação ao valor original.<br><br>
        
        👨‍💻👩‍💻 Para garantir o menor preço na coleta, use a Calculadora PP disponível <a href='https://gustavodiasdeoliveira.github.io/Calculadora-PP/' target='_blank'>aqui</a>, que ajuda a encontrar o menor preço por produto.<br><br>
        <b>✅ Observação:</b> Caso encontre o produto <b>mais barato</b> dentro da margem de <b>30% de diferença</b>, você pode coletá-lo, mesmo que o peso seja menor que o do produto original.`;
    } else if (
      normalizedChoice === "2" ||
      normalizedChoice.includes("onde é feito a pesquisa?")
    ) {
      response =
        `Cada loja é feita em um site diferente. No Danielli a pesquisa deverá
        ser<b> APENAS no aplicativo NFG</b> com a <b>localização Tapejara loja Atacarejo</b><br><br>
        
        Já no <b>Passarela</b> pode ser realizada tanto no <b>Baita Busca quanto no On Passarela.</b><br><br>
        
        <b>📌 Requisito importante:</b> Toda pesquisa de <b>PP no Passarela</b> deve ser acompanhada de <b>evidência</b>. A evidência precisa incluir:<br>
        1. Print da tela <b>inteira</b>.<br>
        2. Mostrando a <b>descrição da planilha.</b><br>
        3. O produto coletado, especificando se foi no <b>Baita Busca ou On Passarela.</b><br>
        4. A <b>data e horário</b> da pesquisa.<br><br>
        ✅ Em caso de dúvida, consulte o <b>assistente, analista ou a supervisora para mais orientações.</b>`;
    } else if (
      normalizedChoice === "3" ||
      normalizedChoice.includes("itens do primeiro preço (pp) sem marca")
    ) {
      response =
        `Nos casos de itens PP, <b>não podemos coletar produtos sem marca.</b><br><br>
        📌 A maioria desses itens sem marca geralmente se encontra nas seções de <b>açougue</b> ou <b>FLV 
        (Frutas, Legumes e Verduras)</b>, especialmente quando são solicitados por <b>quilo</b>, como por exemplo:<br><br>
        <b>PEITO FGO C/O CONG. KG, SOBRECOXA C/DORSO CONG. KG</b>, entre outros.<br><br>
        
        ✅ Em caso de dúvida, consulte o <b>assistente, analista</b> ou a <b>supervisora</b> para garantir a coleta correta.`;
    } else if (
      normalizedChoice === "4" ||
      normalizedChoice.includes("como usar a calculadora?")
    ) {
      response =
        `🔎 A <b>Calculadora PP</b> serve para calcular a variação de <b>30% (máximo e mínimo)</b> que um produto <b>PP</b> pode ter.<br><br>
      
      <b>📌 Como usar:</b><br>
      1. Adicione o <b>preço do produto.</b><br>
      2. A quantidade deve ser <b>1.</b><br>
      3. Escolha a unidade de medida <b>(grama, quilo ou ml).</b><br>
      4. Clique em <b>calcular</b>, e a calculadora irá mostrar o preço <b>mínimo e máximo considerando a variação de 30%.</b><br>
      ✅ Observação: Se o item for apenas unidade, preencha apenas a quantidade. <a href='https://gustavodiasdeoliveira.github.io/Calculadora-PP/' target='_blank'>Clique aqui para acessar a Calculadora PP</a>`;
    } else {
      response = "❌ Opção inválida! Escolha entre 1 a 4.";
    }
  }

  // Lógica para o passo "Encarte"
  else if (currentStep === "encarte") {
    if (
      normalizedChoice === "1" ||
      normalizedChoice.includes("o que é encarte?")
    ) {
      response =
        `<b>📢 O que é um encarte/jornal de ofertas?</b><br><br>
        O </b>encarte</b> ou </b>jornal de ofertas</b> é um material publicitário impresso ou 
        digital que <b>divulga promoções e descontos de um supermercado</b>. Ele é 
        distribuído <b>fisicamente nas lojas</b>, publicado em jornais ou digitalmente 
        por WhatsApp, redes sociais e sites dos mercados. 
        O objetivo é <b>atrair clientes e aumentar as vendas</b>.`;
    } else if (
      normalizedChoice === "3" ||
      normalizedChoice.includes("como subir encarte?")
    ) {
      response =
        ` <b>🛠️ Como cadastrar um encarte no ADM Zukkin?</b><br><br>
        
        1. Acesse <b>ADM Zukkin</b> e vá para <b>Qualidade > Ofertas.</b><br>
        2. Clique na <b>seta ao lado de Visualizar</b> e selecione <b>Adicionar Ofertas.</b><br>
        3. Clique no <b>botão verde</b> e <b>preencha</b> os <b>campos:</b><br>
        <b> - Bandeira:</b> Nome da loja do encarte.<br>
        <b> - Origem:</b> Selecione sempre Encarte.<br>
        <b> - Descrição:</b> Nome do encarte (em destaque no material).<br>
        <b> - Estabelecimento:</b> Loja das ofertas.<br>
        <b> - Capa:</b> Imagem <b>JPEG/PNG</b> da primeira página (máx. 1MB).<br>
        <b> - Arquivo:</b> PDF completo do encarte.<br><br>
        <b>📌 Importante!</b> Não esqueça de <b>preencher</b> a <a href='https://docs.google.com/spreadsheets/d/1km_WXEM8ppKkH8M4-E2ZjlidgF2y2w-l/edit?pli=1&gid=558881161#gid=558881161' target='_blank'>planilha de acompanhamento.</a><br><br>
        🎥 Veja o <a href='https://adm.zukk.in/processos?ID=76' target='_blank'>treinamento em vídeo</a> para mais detalhes.`;
    } else if (
      normalizedChoice === "4" ||
      normalizedChoice.includes("como adicionar preço")
    ) {
      response =
        `<b>📝 Como preencher os preços do encarte?</b><br><br>
        <b>1️⃣ Localize o encarte</b> na <a href='https://docs.google.com/spreadsheets/d/1km_WXEM8ppKkH8M4-E2ZjlidgF2y2w-l/edit?pli=1&gid=558881161#gid=558881161' target='_blank'>planilha de acompanhamento</a><br>
        <b>2️⃣ Em Ofertas</b> altere o <b>Período</b> para uma data anterior à do encarte que será preenchido.<br>
        3️⃣ Atualize a página clicando na <b>seta verde</b> e, na <b>Busca Rápida</b>, procure a <b>descrição do encarte</b>.<br>
        4️⃣ Clique no <b>ícone do lápis</b> para editar.<br>
        5️⃣ Vá em <b>Adicionar Preço</b> e busque o produto.<br>
        <b>-</b> Para facilitar a busca, utilize a seção <b>Produtos do Cliente</b> dentro do <b>Gestão</b>.<br><br>
        ❗ Atenção aos tipos de preços.<br>
        <b>✅ Preço de Encarte:</b> Sempre preenchido como promoção.<br>
        <b>✅ Preço de Fidelidade:</b> Se for preço especial de cartão de loja, clube de ofertas, etc.<br>
        <b>✅ Preço de Atacado:</b> Caso tenha quantidade mínima para compra.<br>
        <b>❌ Ignore preços de Cashback e a partir de...</b> – esses não precisam ser coletados.<br>
        🎥 Para mais detalhes, veja o <a href='https://adm.zukk.in/processos?ID=76' target='_blank'>treinamento em vídeo.</a>`;
    } else if (
      normalizedChoice === "2" ||
      normalizedChoice.includes("onde são enviados os encartes?")
    ) {
      response =
        `<b>📨 Onde são enviados os encartes?</b><br><br>
        Os encartes podem ser obtidos de duas formas:<br>
        <b>1º Busca no Site 🔍</b><br>
        <b> - </b> Acesse o site da loja e procure pela seção <b>"Ofertas"</b> ou <b>"Encarte"</b>.<br>
        <b> - </b> Baixe as imagens ou o PDF publicado.<br>
        <b> - </b> Insira o encarte no sistema.<br><br>
        <b>2º Coleta no Discord 💬</b><br>
        <b> - </b> Alguns encartes são enviados diretamente pelos concorrentes no <b>WhatsApp</b> e repassados para o grupo de <b>encarte</b> no Discord.<br><br>
        <b>🔹 Dicas: </b> Para concorrentes que exigem busca no site, consulte a aba <b>Sites</b> da
        <a href='https://docs.google.com/spreadsheets/d/1km_WXEM8ppKkH8M4-E2ZjlidgF2y2w-l/edit?pli=1&gid=920705557#gid=920705557' target='_blank'>planilha de acompanhamento</a>
        para verificar quais devem ser coletados.<br>
        Sempre verifique se o encarte já foi coletado no Discord e no <a href='https://docs.google.com/spreadsheets/d/1km_WXEM8ppKkH8M4-E2ZjlidgF2y2w-l/edit?pli=1&gid=920705557#gid=920705557' target='_blank'>Acompanhamento</a><br>
        Caso não tenha sido coletado, salve o encarte e siga o processo de envio.`;
    } else if (
      normalizedChoice === "5" ||
      normalizedChoice.includes("dica para salvar a foto do encarte")
    ) {
      response =
        `<b>📌 Dica para salvar a foto do encarte!</b><br><br>
        <b>😎 Passo a passo:</b><br>
        <b>1️⃣ Tire um print</b> de todo o encarte e salve em <b>JPG ou PNG.</b><br>
        <b>2️⃣ Converta para PDF</b> usando <a href='https://www.ilovepdf.com/' target='_blank'>iLovePDF.com.</a><br>
        <b>3️⃣ Para a capa</b>, tire um print separado e garanta que tenha no máximo <b>1MB</b> e esteja em <b>JPG ou PNG</b><br>
        4️⃣ Se precisar, converta <b>JPG para PNG</b> no site <a href='https://jpg2png.com/' target='_blank'>jpg2png.com.</a><br><br>
        <b>📢 Importante:</b> O tamanho correto e o formato adequado garantem que o sistema aceite o arquivo sem problemas! 😊`;
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
