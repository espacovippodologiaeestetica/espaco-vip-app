document.addEventListener("DOMContentLoaded", () => {
  // ===== CONFIGURE AQUI =====
  const AGENDA_URL =
    "https://www.simplesagenda.com.br/agendamento_m.php?id=10e2333dd822c1d9e0592ecf075e4bf4";

  // Seu número com DDI +55 e DDD, só números:
  const WHATS_NUMERO = "5541992297612";

  const MSG_FALAR_COMIGO =
    "Olá! Vim pelo APP Espaço Vip e quero informações/agenda. 💗";
  // ==========================

  // ---------- Navegação segura (evita bloqueio de pop-up) ----------
  function abrirUrl(url) {
    // Em celular/PWA, window.open pode ser bloqueado. Então usamos navegação direta.
    window.location.assign(url);
  }

  function abrirAgenda() {
    abrirUrl(AGENDA_URL);
  }

  function abrirWhats(mensagem) {
    const url =
      "https://wa.me/" + WHATS_NUMERO + "?text=" + encodeURIComponent(mensagem);
    abrirUrl(url);
  }

  // ---------- Bind universal ----------
  function bind(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      // Só previne se for link
      if (el.tagName === "A") e.preventDefault();
      handler();
    });
  }

  // ---------- Tabs ----------
  const tabButtons = Array.from(document.querySelectorAll(".tab[data-tab]"));
  const panels = {
    home: document.getElementById("tab-home"),
    promos: document.getElementById("tab-promos"),
    indicacao: document.getElementById("tab-indicacao"),
    pontos: document.getElementById("tab-pontos"),
    beneficios: document.getElementById("tab-beneficios"),
  };

  function showTab(name) {
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    Object.entries(panels).forEach(([key, el]) => {
      if (!el) return;
      el.classList.toggle("show", key === name);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });

  // Garantia: inicia em "home"
  showTab("home");

  // ---------- HOME ----------
  bind("btnAgenda", abrirAgenda);

  bind("btnWhats", () => abrirWhats(MSG_FALAR_COMIGO));

  bind("btnGoPromos", () => showTab("promos"));

  // ---------- PROMOÇÕES ----------
  bind("promoSegunda", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Segunda no APP Espaço Vip:\n" +
        "- Manicure R$25\n" +
        "- Manicure esmaltação em gel R$50\n" +
        "- Pedicure esmaltação em gel R$60\n" +
        "- SPA dos pés com pedicure R$99,90\n\n" +
        "Pode me passar os horários disponíveis?"
    );
  });

  bind("promoTerca", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Terça no APP Espaço Vip:\n" +
        "- Design de Sobrancelhas R$25\n" +
        "- Designer e Henna R$40\n" +
        "- Brow lamination R$80\n\n" +
        "Pode me passar os horários?"
    );
  });

  bind("promoQuarta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Quarta no APP Espaço Vip:\n" +
        "- Limpeza de pele intensa R$100\n" +
        "- Limpeza de pele ultrassônica R$140\n" +
        "- Limpeza de pele peeling de diamante R$80\n\n" +
        "Quero agendar, quais horários?"
    );
  });

  bind("promoQuinta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Quinta no APP Espaço Vip:\n" +
        "- Depilação íntima completa R$50\n" +
        "- Depilação completa (perna/coxa, íntima, axilas) R$110\n\n" +
        "Pode me passar os horários?"
    );
  });

  bind("promoSexta", () => {
    abrirWhats(
      "Olá! Quero ativar a promoção de Sexta no APP Espaço Vip:\n" +
        "- Bronzeamento R$90 (sem biquíni de fita) — cliente traz biquíni\n" +
        "- 3 sessões R$250\n" +
        "- Bronzeamento com fita R$120\n" +
        "- 3 sessões R$330\n\n" +
        "Quero agendar, quais horários?"
    );
  });

  bind("promoCarnaval", () => {
    abrirWhats(
      "Olá! Quero ativar a Campanha de Fevereiro (Carnaval) no APP Espaço Vip:\n" +
        "- Bronzeamento 4 sessões R$400\n" +
        "- Massagem modeladora 8 sessões R$480\n" +
        "- Drenagem linfática 4 sessões R$450\n\n" +
        "Obs: pacotes pagos na 1ª sessão (valor total). Não acumulativo.\n" +
        "Pode me orientar e passar os horários?"
    );
  });

  // ---------- INDICAÇÃO (COMPARTILHAR COM A AMIGA) ----------
  bind("btnIndicar", async () => {
    const codigo = (document.getElementById("meuCodigo")?.innerText || "VIP-0000").trim();

    const linkApp = window.location.origin + window.location.pathname;

    const texto =
      "Oi! 💕 Conheci o Espaço Vip e lembrei de você!\n\n" +
      "Instale o app e veja promoções/benefícios:\n" + linkApp + "\n\n" +
      "Use meu código: " + codigo + "\n\n" +
      "Qualquer dúvida me chama!";

    // Se suportar “Compartilhar” (Android/iOS)
    if (navigator.share) {
      try {
        await navigator.share({ text: texto });
        return;
      } catch (e) {
        // se cancelar, cai no fallback abaixo
      }
    }

    // Fallback: abre WhatsApp “para escolher contato”
    abrirUrl("https://wa.me/?text=" + encodeURIComponent(texto));
  });

  bind("btnCopiarCodigo", async () => {
    const codigo = (document.getElementById("meuCodigo")?.innerText || "").trim();
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

  bind("btnAbrirAgenda2", abrirAgenda);

  // ---------- PONTOS ----------
  bind("btnValidar", () => {
    alert("Validação manual: depois conectamos com seu controle real.");
  });

  bind("btnReset", () => {
    if (confirm("Quer resetar os dados deste aparelho?")) {
      localStorage.clear();
      location.reload();
    }
  });

  // ---------- BENEFÍCIOS ----------
  bind("btnWhats2", () => abrirWhats(MSG_FALAR_COMIGO));
});
