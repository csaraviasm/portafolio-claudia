#!/bin/bash
#
# Sincroniza la copia local del proyecto con GitHub.
#
# La copia local vive en ~/Proyectos/portafolio-claudia y es un espejo de solo
# lectura: sirve como respaldo y para abrir el código en el editor. El trabajo
# real ocurre en el repositorio remoto.
#
# Uso:
#   bash scripts/sync-local.sh
#
# No necesita mantenimiento: si la carpeta no existe, la crea clonando el repo.

set -euo pipefail

REPO_URL="https://github.com/csaraviasm/portafolio-claudia.git"
DESTINO="$HOME/Proyectos/portafolio-claudia"
RAMA="${1:-main}"

echo "Sincronizando copia local del proyecto"
echo "  Destino: $DESTINO"
echo "  Rama:    $RAMA"
echo

if [ ! -d "$DESTINO/.git" ]; then
  echo "No existe copia local todavía. Creándola..."
  mkdir -p "$(dirname "$DESTINO")"
  git clone "$REPO_URL" "$DESTINO"
  echo "Copia local creada."
else
  cd "$DESTINO"
  git fetch --all --prune
  git checkout "$RAMA"
  git reset --hard "origin/$RAMA"
  echo "Copia local actualizada."
fi

cd "$DESTINO"
echo
echo "Estado actual:"
git log --oneline -1
echo "Última sincronización: $(date '+%Y-%m-%d %H:%M')"
