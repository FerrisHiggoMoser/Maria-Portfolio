#!/usr/bin/env bash
# Batch-resize photographs of artwork for the web.
#
#   tools/prepare-images.sh <source folder> <destination folder> [long edge px]
#
# Example:
#   tools/prepare-images.sh ~/Desktop/jewellery-photos images/jewellery
#
# Originals are never touched; copies are written to the destination folder.
# Needs ImageMagick (brew install imagemagick / apt install imagemagick),
# and falls back to sips on macOS if ImageMagick is missing.

set -euo pipefail

SRC=${1:-}
DEST=${2:-}
EDGE=${3:-2000}
QUALITY=82

if [[ -z "$SRC" || -z "$DEST" ]]; then
  sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

if [[ ! -d "$SRC" ]]; then
  echo "Source folder not found: $SRC" >&2
  exit 1
fi

mkdir -p "$DEST"

shopt -s nullglob nocaseglob
files=("$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png "$SRC"/*.tif "$SRC"/*.tiff "$SRC"/*.heic)
shopt -u nocaseglob

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No photographs found in $SRC" >&2
  exit 1
fi

if command -v magick >/dev/null 2>&1; then
  CONVERT="magick"
elif command -v convert >/dev/null 2>&1; then
  CONVERT="convert"
else
  CONVERT=""
fi

count=0
for file in "${files[@]}"; do
  base=$(basename "${file%.*}")
  # lowercase, spaces to hyphens — keeps paths tidy on every web host
  slug=$(echo "$base" | tr '[:upper:]' '[:lower:]' | tr -c 'a-z0-9\n' '-' | sed 's/-\{2,\}/-/g; s/^-//; s/-$//')
  out="$DEST/$slug.jpg"

  if [[ -n "$CONVERT" ]]; then
    "$CONVERT" "$file" -auto-orient -resize "${EDGE}x${EDGE}>" -quality "$QUALITY" -strip "$out"
  elif command -v sips >/dev/null 2>&1; then
    cp "$file" "$out"
    sips --resampleHeightWidthMax "$EDGE" --setProperty format jpeg "$out" >/dev/null
  else
    echo "Install ImageMagick first: brew install imagemagick" >&2
    exit 1
  fi

  size=$(du -h "$out" | cut -f1)
  echo "  $slug.jpg  ($size)"
  count=$((count + 1))
done

echo
echo "$count photographs written to $DEST"
echo "Now add them to assets/artworks.js — one entry per work."
