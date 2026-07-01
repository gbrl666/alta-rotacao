#!/bin/bash
# ============================================================================
# PUBLICAR — clique duas vezes neste arquivo pra mandar suas mudanças pro ar.
# (Depois de exportar o posts.js no painel e colocar na pasta.)
# O site atualiza sozinho em ~1 minuto: https://gbrl666.github.io/alta-rotacao/
# ============================================================================
cd "$(dirname "$0")" || exit 1
echo "🪩  Publicando o Alta Rotação..."
git add -A
git commit -m "Atualiza posts ($(date '+%d/%m/%Y %H:%M'))" || {
  echo "Nada de novo pra publicar (nenhuma mudança)."; read -n1 -s -r -p "Pode fechar."; exit 0;
}
git push origin main && echo "✅  No ar! O site atualiza em ~1 min: https://gbrl666.github.io/alta-rotacao/"
read -n1 -s -r -p "Pronto — pode fechar esta janela."
