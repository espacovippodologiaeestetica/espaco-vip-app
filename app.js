document.addEventListener("DOMContentLoaded", () => {
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=102e333dd822c1d9e0592ecf075e4bf4";

  const WHATS_NUMERO = "5541992297612"; // seu número atual (com 55)

  function abrirAgenda() {
    window.open(AGENDA_URL, "_blank", "noopener,noreferrer");
  }

  function abrirWhats(mensagem) {
    const url =
      "https://wa.me/" + WHATS_NUMERO + "?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;

    // se for <a>, impede o href="#" de atrapalhar
    el.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  // ===== INÍCIO =====
  bindClick("btnAgenda", abrirAgenda);
  bindClick("btnGoIndicacao", () => {
    // só troca para a aba indicação (se você usa tabs)
    const tabBtn = document.querySelector('[data-tab="indicacao"]');
    if (tabBtn) tabBtn.click();
  });

  // ===== INDICAÇÃO =====
  bindClick("btnAbrirAgenda2", abrirAgenda);

  bindClick("btnIndicar", () => {
    const codigo = document.getElementById("meuCodigo")?.innerText?.trim() || "VIP";
    const msg =
      "Olá 💗 Vim pelo APP Espaço Vip.\n\n" +
      "Quero indicar uma amiga e participar da fidelidade.\n" +
      "Meu código: " + codigo + "\n\n" +
      "Pode me orientar?";
    abrirWhats(msg);
  });

  bindClick("btnCopiarCodigo", async () => {
    const codigo = document.getElementById("meuCodigo")?.innerText?.trim() || "";
    if (!codigo) return;

    try {
      await navigator.clipboard.writeText(codigo);
      alert("Código copiado: " + codigo);
    } catch {
      // fallback
      const input = document.createElement("textarea");
      input.value = codigo;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Código copiado: " + codigo);
    }
  });

  // ===== PONTOS (se existirem) =====
  bindClick("btnValidar", () => {
    alert("Validação manual: depois conectamos com seu controle real.");
  });

  bindClick("btnReset", () => {
    if (confirm("Quer resetar os dados deste aparelho?")) {
      localStorage.clear();
      location.reload();
    }
  });
});
