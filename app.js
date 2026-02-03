document.addEventListener("DOMContentLoaded", () => {
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=102e333dd822c1d9e0592ecf075e4bf4";

  const WHATS_NUMERO = "5541992297612";

  const irPara = (url) => {
    window.location.href = url;
  };

  const abrirAgenda = () => {
    irPara(AGENDA_URL);
  };

  const abrirWhats = (mensagem) => {
    const url =
      "https://wa.me/" +
      WHATS_NUMERO +
      "?text=" +
      encodeURIComponent(mensagem);
    irPara(url);
  };

  const bind = (id, fn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      fn();
    });
  };

  // ===== AGENDA =====
  bind("btnAgenda", abrirAgenda);
  bind("btnAbrirAgenda2", abrirAgenda);

  // ===== PROMOÇÕES =====
  bind("btnGoPromos", () => {
    const tab = document.querySelector('[data-tab="promos"]');
    if (tab) tab.click();
  });

  bind("promoSegunda", () => {
    abrirWhats(
      "Olá! Vim pelo app Espaço Vip 💕\nQuero ativar a promoção de SEGUNDA-FEIRA.\nPode me orientar?"
    );
  });

  bind("promoCarnaval", () => {
    abrirWhats(
      "Olá! Vim pelo app Espaço Vip 🎉\nQuero ativar a CAMPANHA DE FEVEREIRO / CARNAVAL.\nPode me orientar?"
    );
  });

  // ===== INDICAÇÃO =====
  bind("btnIndicar", () => {
    const codigo =
      document.getElementById("meuCodigo")?.innerText || "VIP";
    abrirWhats(
      "Olá! Vim pelo app Espaço Vip 💎\nQuero indicar uma amiga.\nMeu código é: " +
        codigo
    );
  });

  // ===== WHATSAPP DIRETO =====
  bind("btnWhats", () => {
    abrirWhats("Olá! Vim pelo app Espaço Vip e quero informações 😊");
  });

  bind("btnWhats2", () => {
    abrirWhats("Olá! Vim pelo app Espaço Vip e quero informações 😊");
  });
});
