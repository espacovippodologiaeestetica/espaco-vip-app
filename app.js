document.addEventListener("DOMContentLoaded", () => {
  const APP_LINK = "https://espacovippodologiaeestetica.github.io/espaco-vip-app/";
  const TEXTO_INDICACAO =
    "✨ Vem pro APP Espaço Vip! 💖\n" +
    "Promoções do dia + fidelidade + benefícios.\n" +
    "Instala aqui: " + APP_LINK;

  function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  async function compartilharIndicacao() {
    // 1) Melhor: Web Share (celular abre “Compartilhar”)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "APP Espaço Vip",
          text: TEXTO_INDICACAO,
          url: APP_LINK,
        });
        return;
      } catch (e) {
        // usuário cancelou — não faz nada
        return;
      }
    }

    // 2) Fallback: abre WhatsApp para escolher contato (sem número fixo)
    const url = "https://wa.me/?text=" + encodeURIComponent(TEXTO_INDICACAO);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Botão Indicar (ajuste o ID conforme seu HTML)
  bindClick("btnIndicar", compartilharIndicacao);
});
