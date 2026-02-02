// CONFIG
const AGENDA_URL = "https://www.simplesagenda.com.br/agendamento_m.php?id=102e333dd822c1d9e0592ecf075e4bf4";
const WHATS_PHONE = "5541992297612";
const ADMIN_PIN = "8624"; // TROQUE ANTES DE LANÇAR

// STORAGE
const K = { code:"vip_code", points:"vip_points", refs:"vip_refs" };

const tabs = document.querySelectorAll(".tab");
const panels = {
  home: document.getElementById("tab-home"),
  indicacao: document.getElementById("tab-indicacao"),
  pontos: document.getElementById("tab-pontos"),
  beneficios: document.getElementById("tab-beneficios"),
  admin: document.getElementById("tab-admin")
};

function showTab(name){
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  Object.entries(panels).forEach(([k,el]) => el.classList.toggle("show", k===name));
  refresh();
}

tabs.forEach(t => t.addEventListener("click", ()=>showTab(t.dataset.tab)));

function genCode(){ return VIP-${Math.floor(1000+Math.random()*9000)}; }
function code(){ return localStorage.getItem(K.code) || (localStorage.setItem(K.code, genCode()), localStorage.getItem(K.code)); }
function getInt(k){ return parseInt(localStorage.getItem(k)||"0",10); }
function setInt(k,v){ localStorage.setItem(k,String(v)); }
function wa(msg){ return https://wa.me/${WHATS_PHONE}?text=${encodeURIComponent(msg)}; }

const btnAgenda = document.getElementById("btnAgenda");
btnAgenda.href = AGENDA_URL;

document.getElementById("btnAgenda3").onclick = ()=>window.open(AGENDA_URL,"_blank");
document.getElementById("btnAbrirAgenda2").onclick = ()=>window.open(AGENDA_URL,"_blank");
document.getElementById("btnGoIndicacao").onclick = ()=>showTab("indicacao");

document.getElementById("btnCopiarCodigo").onclick = async ()=>{
  try{ await navigator.clipboard.writeText(code()); }catch{ alert(code()); }
};

document.getElementById("btnIndicar").onclick = ()=>{
  const msg = Oi! 💛\nQuero te indicar o Espaço Vip.\n\nAgende aqui:\n${AGENDA_URL}\n\nCódigo de indicação: ${code()};
  window.location.href = wa(msg);
};

function resgate(t){
  window.location.href = wa(Olá! 💛\nQuero resgatar minha recompensa:\n${t}\nCódigo: ${code()}\n\n(Resgate seg–qua, conforme disponibilidade));
}

document.getElementById("btnResgatar3").onclick = ()=>resgate("Design de sobrancelhas GRATUITO (3 indicações)");
document.getElementById("btnResgatar5").onclick = ()=>resgate("R$ 15 de desconto (5 indicações)");
document.getElementById("btnResgatar8").onclick = ()=>resgate("Manicure simples (8 indicações)");

document.getElementById("btnValidar").onclick = ()=>{
  if(document.getElementById("pin").value!==ADMIN_PIN) return alert("PIN inválido");
  const q = Math.max(1, parseInt(document.getElementById("qtd").value||"1",10));
  setInt(K.refs, getInt(K.refs)+q);
  setInt(K.points, getInt(K.points)+q*5);
  refresh();
  alert(+${q} indicação(ões) validada(s));
};

document.getElementById("btnReset").onclick = ()=>{
  if(document.getElementById("pin").value!==ADMIN_PIN) return alert("PIN inválido");
  localStorage.clear(); refresh();
};

// ADMIN SECRETO (long press no título)
const secret = document.getElementById("secretAdmin");
let timer=null;
const start=()=>timer=setTimeout(()=>{
  const p=prompt("PIN Admin");
  if(p===ADMIN_PIN) showTab("admin"); else if(p) alert("PIN inválido");
},900);
const stop=()=>{ if(timer) clearTimeout(timer); timer=null; };
["mousedown","touchstart"].forEach(e=>secret.addEventListener(e,start));
["mouseup","mouseleave","touchend","touchcancel"].forEach(e=>secret.addEventListener(e,stop));

function refresh(){
  document.getElementById("meuCodigo").textContent = code();
  const r=getInt(K.refs), p=getInt(K.points);
  document.getElementById("indicacoes").textContent=r;
  document.getElementById("pontos").textContent=p;
  document.getElementById("btnResgatar3").disabled = r<3;
  document.getElementById("btnResgatar5").disabled = r<5;
  document.getElementById("btnResgatar8").disabled = r<8;
  document.getElementById("proximaMeta").textContent =
    r<3?Faltam ${3-r} para Design:
    r<5?Faltam ${5-r} para R$ 15:
    r<8?Faltam ${8-r} para Manicure:
    "Todas as recompensas liberadas 🎉";
}

refresh(); showTab("home");
