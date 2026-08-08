#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/docs/agent-instructions.md"
BANNER="<!-- AUTO-GENERATED from docs/agent-instructions.md - do not edit directly -->"

if [[ ! -f "$SOURCE" ]]; then
  echo "Error: source file not found: $SOURCE" >&2
  exit 1
fi

TARGETS=(
  "$ROOT/.github/cursor-instructions.md"
  "$ROOT/cursor.md"
  "$ROOT/claude.md"
)

for target in "${TARGETS[@]}"; do
  mkdir -p "$(dirname "$target")"
  {
    echo "$BANNER"
    echo ""
    cat "$SOURCE"
  } > "$target"
  echo "Synced: $target"
done

echo "Done. All instruction files synced from docs/agent-instructions.md"
