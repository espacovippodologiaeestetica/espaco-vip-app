document.addEventListener("DOMContentLoaded", () => {
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=102e333dd822c1d9e0592ecf075e4bf4";

  const WHATS_NUMERO = "5541992297612"; // número correto com 55

  function abrirAgenda() {
    window.open(AGENDA_URL, "_blank");
  }

  function abrirWhats(mensagem) {
    const url =
      "https://wa.me/" +
      WHATS_NUMERO +
      "?text=" +
      encodeURIComponent(mensagem);
    window.open(url, "_blank");
  }

  function bind(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      fn();
    });
  }

  // BOTÕES PRINCIPAIS
  bind("btnAgenda", abrirAgenda);
  bind("btnAbrirAgenda2", abrirAgenda);

  bind("btnGoIndicacao", () => {
    document
      .querySelector('[data-tab="indicacao"]')
      ?.click();
  });

  bind("btnIndicar", () => {
    const codigo =
      document.getElementById("meuCodigo")?.innerText || "VIP";
    const msg =
      "Olá 💖 Vim pelo APP Espaço Vip.\n\n" +
      "Quero indicar uma amiga e participar da fidelidade.\n" +
      "Meu código: " +
      codigo +
      "\n\nPode me orientar?";
    abrirWhats(msg);
  });

  bind("btnCopiarCodigo", async () => {
    const codigo =
      document.getElementById("meuCodigo")?.innerText;
    if (!codigo) return;

    try {
      await navigator.clipboard.writeText(codigo);
      alert("Código copiado: " + codigo);
    } catch {
      const input = document.createElement("textarea");
      input.value = codigo;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert("Código copiado: " + codigo);
    }
  });

  bind("btnFalarWhats", () => {
    abrirWhats(
      "Olá 💕 Vim pelo APP Espaço Vip e quero ativar uma promoção."
    );
  });
});
