# Alta Rotação 🎤

Seu blog de opinião sobre música pop. Não precisa de internet, servidor nem mensalidade — são só arquivos.

## Como abrir

Dê **dois cliques no `index.html`** pra ver o site.
Pra escrever, abra o **`admin.html`** (ou clique em "Escrever ✎" no topo do site).

## Como fazer um post (o passo a passo)

1. Abra o **`admin.html`**.
2. Preencha **Título**, a **linha de apoio**, escolha a **diva** e escreva o **texto**.
   - A prévia do lado direito mostra na hora como vai ficar.
3. Clique em **Salvar post**. Pronto — já dá pra ver no seu site (aqui no seu navegador).
4. Quando quiser deixar **no ar pra todo mundo**, clique em **⬇ Publicar / Exportar**.
   Isso baixa um arquivo `posts.js`. **Coloque ele na pasta do site, por cima do antigo.** Publicado.

### Formatação do texto (opcional)
| Você escreve | Vira |
|---|---|
| `## Um subtítulo` | subtítulo grande |
| `### Menor` | subtítulo menor |
| `> uma frase` | citação em destaque |
| `**negrito**` | **negrito** |
| `*itálico*` | *itálico* |
| `[texto](https://link)` | link |

Linha em branco = novo parágrafo.

## Editar a página "Sobre"

Abra o arquivo **`sobre.js`** num editor de texto e mude o que está dentro de `texto: \`...\``. Vale a mesma formatação dos posts (`##`, `>`, `**negrito**`). Troque também o emoji do retrato no campo `foto`. Depois publique como sempre (dois cliques no `publicar.command`).

## Colocar o site no ar (quando quiser)

Arraste a pasta inteira pra um serviço grátis como **Netlify Drop** (app.netlify.com/drop)
ou **GitHub Pages**. Aí você ganha um endereço público. Me chama que eu te ajudo nessa parte.

## Easter eggs escondidos (a estética da pista)

O visual converge sete álbuns: The Fame Monster, Confessions on a Dance Floor, Confessions Tour, Blackout, Mayhem, Ray of Light e Aphrodite → clube preto, neon magenta→violeta, dourado de deusa e globo espelhado. Escondidos no site (arquivo `fx.js`):

1. **Tagline giratória** embaixo do nome — cada frase cita um álbum sem dizer o nome ("A luz que não apaga" = Ray of Light, "Apagão às quatro da manhã" = Blackout, "Deusa saindo da espuma" = Aphrodite...).
2. **Globo espelhado** no canto — clique **3 vezes** pra ligar o **Modo Pista** (as luzes pulsam e o nome vira neon).
3. **Código Konami** (↑ ↑ ↓ ↓ ← → ← → B A) também liga o Modo Pista.
4. Digite **"padam"** em qualquer página → chove coração (piscadela pra Kylie).
5. **Espelho rachado** aparece ao passar o mouse nas capas (referência ao Mayhem).
6. Rodapé com "Get out on the dance floor" e um recado escondido no **console** do navegador (F12).

Pra tirar qualquer um, é só apagar o trecho no `fx.js`.

## Trocar cores / nome
- Cores: topo do `styles.css` (as linhas com `--destaque`, `--papel` etc.).
- Nome "Alta Rotação": procure por esse texto no `index.html`, `post.html` e `admin.html`.
