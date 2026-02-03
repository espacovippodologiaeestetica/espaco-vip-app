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
  bind("btnIndicar", async () => {
  const codigo = document.getElementById("meuCodigo")?.innerText || "VIP-0000";

  const texto =
    "Oi! 💕 Conheci o Espaço Vip e lembrei de você!\n\n" +
    "Baixe o app e aproveite as promoções e benefícios:\n" +
    window.location.origin + window.location.pathname + "\n\n" +
    "Use meu código: " + codigo + "\n" +
    "Qualquer dúvida me chama!";

  // Se o celular suportar compartilhamento
  if (navigator.share) {
    try {
      await navigator.share({ text: texto });
      return;
    } catch (e) {}
  }

  // Fallback: abre WhatsApp pra cliente encaminhar manualmente (ela escolhe contato)
  abrirUrl("https://wa.me/?text=" + encodeURIComponent(texto));
});
