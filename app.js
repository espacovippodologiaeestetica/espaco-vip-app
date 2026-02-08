alert("app.js carregou ✅");
document.addEventListener("DOMContentLoaded", () => {
  // ====== CONFIGURE AQUI ======
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=10e2333dd822c1d9e0592ecf075e4bf4";

  // Seu número com DDI +55 e DDD, só números:
  const WHATS_NUMERO = "5541992297612";

  const MSG_FALAR_COMIGO =
    "Olá! Vim pelo APP Espaço Vip e quero informações/agenda. 💗";

  // ============================

  console.log("✅ app.js carregou");

  function go(url) {
    window.location.assign(url);
  }

  function abrirAgenda() {
    go(AGENDA_URL);
  }

  function abrirWhats(mensagem) {
    const url =
      "https://wa.me/" + WHATS_NUMERO + "?text=" + encodeURIComponent(mensagem);
    go(url);
  }

  function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault?.();
      handler();
    });
  }

  // ====== TABS (agora aqui no app.js) ======
  const tabs = document.querySelectorAll(".tab");
  const panels = {
    home: document.getElementById("tab-home"),
    promos: document.getElementById("tab-promos"),
    indicacao: document.getElementById("tab-indicacao"),
    pontos: document.getElementById("tab-pontos"),
    beneficios: document.getElementById("tab-beneficios"),
  };

  function show(tab) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
    Object.entries(panels).forEach(([k, el]) => {
      if (!el) return;
      el.classList.toggle("show", k === tab);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.tab)));

  function openTab(tabName) {
    const btn = document.querySelector([data-tab="${tabName}"]);
    if (btn) btn.click();
  }

  // ====== HOME ======
  bindClick("btnAgenda", abrirAgenda);
  bindClick("btnWhats", () => abrirWhats(MSG_FALAR_COMIGO));
  bindClick("btnGoPromos", () => openTab("promos"));

  // ====== PROMOÇÕES (NOVAS) ======
  bindClick("promoSegunda", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Segunda no APP Espaço Vip:\n" +
        "• Manicure e pedicure R$55\n" +
        "• Manicure e pedicure com esmaltação em gel R$130 (ganha SPA do pé)\n\n" +
        "Pode me passar os horários disponíveis?"
    );
  });

  bindClick("promoTerca", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Terça no APP Espaço Vip:\n" +
        "• Depilação íntima completa R$50\n" +
        "• Depilação completa R$130 (Perna completa, íntima completa, linha alba e axilas)\n" +
        "• Designer de sobrancelhas + buço R$38\n\n" +
        "Pode me passar os horários disponíveis?"
    );
  });

  bindClick("promoQuarta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Quarta no APP Espaço Vip:\n" +
        "• Limpeza de pele R$99,99\n" +
        "• Peeling de diamante R$50 (não tem extração)\n\n" +
        "Quero agendar, quais horários?"
    );
  });

  bindClick("promoQuinta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Quinta no APP Espaço Vip:\n" +
        "• Bronzeamento artificial R$90 (biquíni da cliente)\n" +
        "• Bronzeamento com biquíni de fita R$118\n" +
        "• Bronzeamento + massagem R$150\n\n" +
        "Pode me passar os horários disponíveis?"
    );
  });

  // Campanha do mês (genérica)
  bindClick("promoCarnaval", () => {
    abrirWhats(
      "Olá! Vim pelo APP Espaço Vip e quero informações sobre a campanha do mês.\n\n" +
        "Pode me explicar como funciona e quais horários disponíveis?"
    );
  });

  // ====== INDICAÇÃO ======
  bindClick("btnIndicar", () => {
    const codigoEl = document.getElementById("meuCodigo");
    const codigo = (codigoEl ? codigoEl.textContent : "").trim() || "VIP-0000";

    abrirWhats(
      "Olá! Vim pelo APP Espaço Vip. 💕\n\n" +
        "Quero indicar uma amiga e participar da fidelidade.\n" +
        "Meu código: " + codigo + "\n\n" +
        "Como faço?"
    );
  });

  bindClick("btnCopiarCodigo", async () => {
    const codigoEl = document.getElementById("meuCodigo");
    const codigo = (codigoEl ? codigoEl.textContent : "").trim();
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

  // botão agenda dentro da aba Indicação
  bindClick("btnAbrirAgenda2", abrirAgenda);

  // ====== PONTOS ======
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
  bindClick("btnWhats2", () => abrirWhats(MSG_FALAR_COMIGO));
});
