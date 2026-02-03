document.addEventListener("DOMContentLoaded", () => {

  // ===== CONFIGURAÇÕES =====
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=10e2333dd822c1d9e0592ecf075e4bf4";

  const WHATS_NUMERO = "5541992297612";

  const MSG_FALAR_COMIGO =
    "Olá! Vim pelo APP Espaço Vip e quero informações/agenda 💗";

  // ===== FUNÇÕES =====
  function abrirUrl(url) {
    window.location.href = url;
  }

  function abrirWhats(mensagem) {
    abrirUrl(
      "https://wa.me/" +
        WHATS_NUMERO +
        "?text=" +
        encodeURIComponent(mensagem)
    );
  }

  function bind(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  }

  // ===== TABS =====
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("show"));

      tab.classList.add("active");
      document
        .getElementById("tab-" + tab.dataset.tab)
        .classList.add("show");
    });
  });

  // ===== HOME =====
  bind("btnAgenda", () => abrirUrl(AGENDA_URL));
  bind("btnWhats", () => abrirWhats(MSG_FALAR_COMIGO));
  bind("btnWhats2", () => abrirWhats(MSG_FALAR_COMIGO));

  bind("btnGoPromos", () => {
    document.querySelector('[data-tab="promos"]').click();
  });

  // ===== PROMOÇÕES =====
  bind("promoSegunda", () =>
    abrirWhats(
      "Olá! Quero ativar a promoção de Segunda-feira no APP Espaço Vip.\n\nPode me passar os horários?"
    )
  );

  bind("promoCarnaval", () =>
    abrirWhats(
      "Olá! Quero ativar a Campanha de Fevereiro (Carnaval) no APP Espaço Vip.\n\nPode me orientar?"
    )
  );

  // ===== INDICAÇÃO =====
  bind("btnIndicar", () => {
    const codigo = document.getElementById("meuCodigo")?.innerText || "VIP-0000";

    abrirWhats(
      "Olá! Vim pelo APP Espaço Vip 💕\n\nQuero indicar uma amiga.\nMeu código: " +
        codigo
    );
  });

  bind("btnCopiarCodigo", () => {
    const codigo = document.getElementById("meuCodigo").innerText;
    navigator.clipboard.writeText(codigo);
    alert("Código copiado!");
  });

  // ===== PONTOS =====
  bind("btnValidar", () => {
    alert("Validação manual por enquanto 💗");
  });
});
