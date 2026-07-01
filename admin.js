/* ==========================================================================
   admin.js — a lógica do painel de escrita.
   Guarda tudo no navegador (localStorage) e exporta o posts.js pra publicar.
   ========================================================================== */

const CHAVE = "altarotacao_posts";

// Carrega os posts que estão em edição (localStorage) ou, na primeira vez,
// copia o que já está publicado no posts.js.
function lerAdmin() {
  try {
    const s = localStorage.getItem(CHAVE);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return Array.isArray(window.POSTS) ? window.POSTS.slice() : [];
}
function salvarAdmin(arr) {
  localStorage.setItem(CHAVE, JSON.stringify(arr));
}

// transforma "Título Legal!" em "titulo-legal" pra virar id/link
function gerarId(titulo) {
  const base = (titulo || "post").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")   // tira acento
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "post";
  // garante que não repita
  const usados = new Set(lerAdmin().map(p => p.id).filter(x => x !== $("f_id").value));
  let id = base, n = 2;
  while (usados.has(id)) id = `${base}-${n++}`;
  return id;
}

const $ = (id) => document.getElementById(id);

// ---- Preencher o formulário -------------------------------------------------
function editar(id) {
  const p = lerAdmin().find(x => x.id === id);
  if (!p) return;
  $("f_id").value = p.id;
  $("f_titulo").value = p.titulo || "";
  $("f_dek").value = p.dek || "";
  $("f_diva").value = p.diva || "Pop em geral";
  $("f_capa").value = p.capa || "";
  $("f_data").value = p.data || hoje();
  $("f_corpo").value = p.corpo || "";
  atualizarPreview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limparForm() {
  $("f_id").value = "";
  $("f_titulo").value = "";
  $("f_dek").value = "";
  $("f_diva").value = "Britney Spears";
  $("f_capa").value = "";
  $("f_data").value = hoje();
  $("f_corpo").value = "";
  atualizarPreview();
}

function hoje() { return new Date().toISOString().slice(0, 10); }

// ---- Salvar -----------------------------------------------------------------
function salvarPost() {
  const titulo = $("f_titulo").value.trim();
  if (!titulo) { alert("Dá um título pro post primeiro 🙂"); $("f_titulo").focus(); return; }

  const posts = lerAdmin();
  const idAtual = $("f_id").value;
  const post = {
    id: idAtual || gerarId(titulo),
    diva: $("f_diva").value,
    titulo,
    dek: $("f_dek").value.trim(),
    autor: "Gabriel",
    data: $("f_data").value || hoje(),
    capa: $("f_capa").value.trim(),
    corpo: $("f_corpo").value
  };

  const i = posts.findIndex(p => p.id === post.id);
  if (i >= 0) posts[i] = post; else posts.unshift(post);

  salvarAdmin(posts);
  $("f_id").value = post.id;
  renderLista();
  flash("Salvo! ✅  (aparece no site aqui do seu navegador. Pra publicar pra todo mundo, clique em “Publicar / Exportar”.)");
}

function apagar(id) {
  if (!confirm("Apagar esse post de vez?")) return;
  salvarAdmin(lerAdmin().filter(p => p.id !== id));
  if ($("f_id").value === id) limparForm();
  renderLista();
}

// ---- Publicar: gera o arquivo posts.js pra baixar --------------------------
function publicar() {
  const posts = lerAdmin();
  if (!posts.length) { alert("Escreva ao menos um post antes de publicar."); return; }

  const conteudo =
`/* Gerado pelo painel da Alta Rotação em ${new Date().toLocaleString("pt-BR")}.
   Substitua o posts.js da pasta do site por este arquivo pra publicar. */

window.POSTS = ${JSON.stringify(posts, null, 2)};
`;
  const blob = new Blob([conteudo], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "posts.js";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  flash("Baixei o posts.js 📦  Agora é só colocar esse arquivo na pasta do site, por cima do antigo.");
}

// ---- Prévia ao vivo ---------------------------------------------------------
function atualizarPreview() {
  $("p_diva").textContent = $("f_diva").value;
  $("p_titulo").textContent = $("f_titulo").value || "Título do post";
  $("p_dek").textContent = $("f_dek").value;
  $("p_corpo").innerHTML = formatarCorpo($("f_corpo").value || "*A prévia do texto aparece aqui conforme você escreve.*");
}

// ---- Lista de posts ---------------------------------------------------------
function renderLista() {
  const posts = porData(lerAdmin());
  const alvo = $("listaPosts");
  if (!posts.length) { alvo.innerHTML = `<p style="color:#57514a">Nenhum post ainda. Escreva o primeiro aí em cima ☝️</p>`; return; }
  alvo.innerHTML = posts.map(p => `
    <div class="item">
      <div class="info">
        <h4>${escapar(p.titulo)}</h4>
        <small>${escapar(p.diva || "")} · ${dataBonita(p.data)}</small>
      </div>
      <div class="item-acoes">
        <a class="btn" href="post.html?p=${encodeURIComponent(p.id)}" target="_blank">Ver</a>
        <button class="btn" onclick="editar('${p.id}')">Editar</button>
        <button class="btn perigo" onclick="apagar('${p.id}')">Apagar</button>
      </div>
    </div>`).join("");
}

// ---- Aviso rápido -----------------------------------------------------------
let flashTimer;
function flash(msg) {
  let el = document.getElementById("flash");
  if (!el) {
    el = document.createElement("div");
    el.id = "flash";
    el.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1a1714;color:#f4f1ea;padding:14px 20px;border-radius:8px;font-family:sans-serif;font-size:14px;max-width:520px;box-shadow:0 8px 30px rgba(0,0,0,.25);z-index:99";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => { el.style.transition = "opacity .5s"; el.style.opacity = "0"; }, 4200);
}

// ---- Ligações ---------------------------------------------------------------
$("btnSalvar").onclick = salvarPost;
$("btnLimpar").onclick = limparForm;
$("btnNovo").onclick = limparForm;
$("btnPublicar").onclick = publicar;
["f_titulo","f_dek","f_diva","f_corpo"].forEach(id => {
  $(id).addEventListener("input", atualizarPreview);
});

// arranca
limparForm();
renderLista();
