document.addEventListener("DOMContentLoaded", () => {
  // ====== CONFIGURE AQUI ======
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=10e2333dd822c1d9e0592ecf075e4bf4";

  // Coloque seu número com DDI +55 e DDD, só números:
  const WHATS_NUMERO = "5541992297612";

  // Mensagem padrão do botão "Falar comigo"
  const MSG_FALAR_COMIGO =
    "Olá! Vim pelo APP Espaço Vip e quero informações/agenda. 💗";

  // ============================

  function openBlank(url) {
    // mais compatível com celular
    window.location.href = url;
  }

  function abrirAgenda() {
    openBlank(AGENDA_URL);
  }

  function abrirWhats(mensagem) {
    const url =
      "https://wa.me/" +
      WHATS_NUMERO +
      "?text=" +
      encodeURIComponent(mensagem);
    openBlank(url);
  }

  function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", (e) => {
      // se for <a href="#"> evita pular pro topo
      e.preventDefault();
      handler();
    });
  }

  // ====== Abas (tabs) ======
  function openTab(tabName) {
    // botão com data-tab="promos", etc
    const tabBtn = document.querySelector([data-tab="${tabName}"]);
    if (tabBtn) tabBtn.click();
  }

  // ====== HOME ======
  bindClick("btnAgenda", abrirAgenda);

  bindClick("btnWhats", () => {
    abrirWhats(MSG_FALAR_COMIGO);
  });

  // botão "Ver promoções do dia" que só troca pra aba Promoções
  bindClick("btnGoPromos", () => openTab("promos"));

  // ====== PROMOÇÕES ======
  // Se você tiver botões "Ativar oferta de segunda" etc
  bindClick("promoSegunda", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Segunda no APP Espaço Vip:\n" +
        "- Manicure R$25\n" +
        "- Manicure esmaltação em gel R$50\n" +
        "- Pedicure esmaltação em gel R$60\n" +
        "- SPA dos pés com pedicure R$99,90\n\n" +
        "Pode me passar os horários disponíveis?"
    );
  });

  bindClick("promoTerca", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Terça no APP Espaço Vip:\n" +
        "- Design de Sobrancelhas R$25\n" +
        "- Designer e Henna R$40\n" +
        "- Brow lamination R$80\n\n" +
        "Pode me passar os horários?"
    );
  });

  bindClick("promoQuarta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Quarta no APP Espaço Vip:\n" +
        "- Limpeza de pele intensa R$100\n" +
        "- Limpeza de pele ultrassônica R$140\n" +
        "- Limpeza de pele peeling de diamante R$80\n\n" +
        "Quero agendar, quais horários?"
    );
  });

  bindClick("promoQuinta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Quinta no APP Espaço Vip:\n" +
        "- Depilação íntima completa R$50\n" +
        "- Depilação completa (perna/coxa, íntima, axilas) R$110\n\n" +
        "Pode me passar os horários?"
    );
  });

  bindClick("promoSexta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Sexta no APP Espaço Vip:\n" +
        "- Bronzeamento R$90 (sem biquíni de fita) — cliente traz biquíni\n" +
        "- 3 sessões R$250\n" +
        "- Bronzeamento com fita R$120\n" +
        "- 3 sessões R$330\n\n" +
        "Quero agendar, quais horários?"
    );
  });

  // Campanha do mês (Carnaval)
  bindClick("promoCarnaval", () => {
    abrirWhats(
      "Olá! Quero ativar a Campanha de Fevereiro (Carnaval) no APP Espaço Vip:\n" +
        "- Bronzeamento 4 sessões R$400\n" +
        "- Massagem modeladora 8 sessões R$480\n" +
        "- Drenagem linfática 4 sessões R$450\n\n" +
        "Obs: pacotes pagos na 1ª sessão (valor total). Não acumulativo.\n" +
        "Pode me orientar e passar os horários?"
    );
  });

  // ====== INDICAÇÃO ======
  // Botão "Indicar uma amiga" -> abre Whats pra você com mensagem pronta
  bindClick("btnIndicar", () => {
    const codigoEl = document.getElementById("meuCodigo");
    const codigo = (codigoEl ? codigoEl.innerText : "").trim() || "VIP-0000";

    abrirWhats(
      "Olá! Vim pelo APP Espaço Vip. 💕\n\n" +
        "Quero indicar uma amiga e participar da fidelidade.\n" +
        "Meu código: " + codigo + "\n\n" +
        "Como faço?"
    );
  });

  // Copiar código
  bindClick("btnCopiarCodigo", async () => {
    const codigoEl = document.getElementById("meuCodigo");
    const codigo = (codigoEl ? codigoEl.innerText : "").trim();
    if (!codigo) return;

    try {
      await navigator.clipboard.writeText(codigo);
      alert("Código copiado: " + codigo);
    } catch (e) {
      const input = document.createElement("textarea");
      input.value = codigo;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Código copiado: " + codigo);
    }
  });

  // ====== PONTOS (se existir) ======
  bindClick("btnValidar", () => {
    alert("Validação manual: depois conectamos com seu controle real.");
  });

  bindClick("btnReset", () => {
    if (confirm("Quer resetar os dados deste aparelho?")) {
      localStorage.clear();
      location.reload();
    }
  });

  // ====== BENEFÍCIOS ======
  bindClick("btnWhats2", () => {
    abrirWhats(MSG_FALAR_COMIGO);
  });
});
