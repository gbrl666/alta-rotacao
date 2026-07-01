/* ==========================================================================
   fx.js — os easter eggs da pista. Puro enfeite, não mexe nos seus posts.

   O que tem escondido aqui:
   1) A tagline embaixo do nome troca sozinha, citando os álbuns sem dizer o nome.
   2) Clicar 3x no globo espelhado (canto sup. direito) liga o MODO PISTA.
   3) O código Konami (↑↑↓↓←→←→ B A) também liga o MODO PISTA.
   4) Digitar "padam" a qualquer momento solta coraçõezinhos subindo (piscadela pra Kylie).
   5) Uma mensagem escondida no console do navegador (F12).
   ========================================================================== */

(function () {
  // 1) TAGLINE GIRATÓRIA — cada frase evoca um álbum, sem entregar o nome.
  const taglines = [
    "Pop · Opinião · As divas que importam",
    "Toca até o sol raiar",            // Confessions on a Dance Floor
    "A luz que não apaga",             // Ray of Light
    "Confissões na pista",             // Confessions Tour
    "Monstros de fama, sem pedir desculpa", // The Fame Monster
    "Apagão às quatro da manhã",       // Blackout
    "Deusa saindo da espuma",          // Aphrodite
    "Caos, brilho e espelho rachado"   // Mayhem
  ];
  const alvo = document.querySelector(".tagline");
  if (alvo) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % taglines.length;
      alvo.style.opacity = "0";
      setTimeout(() => { alvo.textContent = taglines[i]; alvo.style.opacity = ".9"; }, 400);
    }, 4200);
  }

  // MODO PISTA — liga/desliga o glow pulsante e o neon deslizante.
  function toggleModoPista(forcar) {
    const ligado = document.body.classList.toggle("modo-pista", forcar);
    if (ligado) chuvaDePadam(6);
  }

  // 2) Globo espelhado: 3 cliques ligam a pista.
  const ball = document.querySelector(".discoball-wrap");
  if (ball) {
    let cliques = 0, timer;
    ball.addEventListener("click", () => {
      cliques++;
      clearTimeout(timer);
      timer = setTimeout(() => (cliques = 0), 800);
      if (cliques >= 3) { cliques = 0; toggleModoPista(); }
    });
  }

  // 3) Código Konami.
  const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let passo = 0;
  document.addEventListener("keydown", (e) => {
    passo = (e.key.toLowerCase() === konami[passo].toLowerCase()) ? passo + 1 : 0;
    if (passo === konami.length) { passo = 0; toggleModoPista(true); }
  });

  // 4) Digitar "padam" -> coraçõezinhos.
  let buffer = "";
  document.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-5);
    if (buffer === "padam") chuvaDePadam(8);
  });

  function chuvaDePadam(qtd) {
    for (let n = 0; n < qtd; n++) {
      setTimeout(() => {
        const c = document.createElement("div");
        c.className = "padam";
        c.textContent = Math.random() < .5 ? "♥" : "✦";
        c.style.left = (8 + Math.random() * 84) + "vw";
        c.style.color = ["#ff2e7e", "#8b4dff", "#e7b24a"][n % 3];
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 2700);
      }, n * 140);
    }
  }

  // 5) Recadinho escondido no console.
  console.log(
    "%cALTA ROTAÇÃO", "font:700 22px Georgia;color:#ff2e7e;",
  );
  console.log(
    "%cVocê achou os bastidores. Clique 3x no globo espelhado, ou digite 'padam'. 💿",
    "color:#8b4dff;font-size:13px;"
  );
})();
