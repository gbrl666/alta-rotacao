/* ==========================================================================
   app.js — funções compartilhadas pelo site e pelo painel.
   ========================================================================== */

// De onde vêm os posts:
// 1) se você tem rascunhos salvos no painel (localStorage), usamos eles;
// 2) senão, usamos o que está publicado no posts.js.
function carregarPosts() {
  try {
    const salvos = localStorage.getItem("altarotacao_posts");
    if (salvos) {
      const arr = JSON.parse(salvos);
      if (Array.isArray(arr) && arr.length) return arr;
    }
  } catch (e) { /* ignora */ }
  return Array.isArray(window.POSTS) ? window.POSTS.slice() : [];
}

// Ordena do mais novo pro mais antigo.
function porData(posts) {
  return posts.slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
}

// Data bonita em português: 2026-06-24 -> "24 de junho de 2026"
function dataBonita(iso) {
  if (!iso) return "";
  const meses = ["janeiro","fevereiro","março","abril","maio","junho",
                 "julho","agosto","setembro","outubro","novembro","dezembro"];
  const [a, m, d] = iso.split("-").map(Number);
  if (!a || !m || !d) return iso;
  return `${d} de ${meses[m - 1]} de ${a}`;
}

// Escapa HTML pra ninguém quebrar a página com < > &.
function escapar(txt) {
  return String(txt)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Mini formatador de texto. Você escreve simples e ele vira HTML:
//   ## Título          -> subtítulo grande
//   ### Título         -> subtítulo menor
//   > frase            -> citação em destaque
//   **negrito**  *itálico*  [texto](link)
//   linha em branco separa parágrafos.
function formatarCorpo(texto) {
  const blocos = String(texto).replace(/\r/g, "").split(/\n{2,}/);
  return blocos.map(bloco => {
    const linha = bloco.trim();
    if (!linha) return "";

    if (linha.startsWith("### ")) return `<h3>${inline(linha.slice(4))}</h3>`;
    if (linha.startsWith("## "))  return `<h2>${inline(linha.slice(3))}</h2>`;
    if (linha.startsWith("> "))   return `<blockquote>${inline(linha.slice(2))}</blockquote>`;

    // parágrafo normal (quebras simples viram <br>)
    const corpo = linha.split("\n").map(inline).join("<br>");
    return `<p>${corpo}</p>`;
  }).join("\n");
}

// formatação dentro da linha: negrito, itálico, links
function inline(txt) {
  let s = escapar(txt);
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return s;
}

// Acha um post pelo id (usado na página do post).
function acharPost(id) {
  return carregarPosts().find(p => p.id === id);
}

// Pega o ?p=... da URL.
function idDaUrl() {
  return new URLSearchParams(location.search).get("p");
}
