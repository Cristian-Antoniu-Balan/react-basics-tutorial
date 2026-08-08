#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/.cursor/rules/project-guidelines.mdc"
BANNER="<!-- AUTO-GENERATED from .cursor/rules/project-guidelines.mdc - do not edit directly -->"

if [[ ! -f "$SOURCE" ]]; then
  echo "Error: source file not found: $SOURCE" >&2
  exit 1
fi

# Body only — strip YAML frontmatter used by Cursor rules
BODY="$(awk '
  BEGIN { in_frontmatter = 0; done_frontmatter = 0 }
  NR == 1 && /^---$/ { in_frontmatter = 1; next }
  in_frontmatter && /^---$/ { in_frontmatter = 0; done_frontmatter = 1; next }
  in_frontmatter { next }
  done_frontmatter && NF == 0 && !seen_content { next }
  { seen_content = 1; print }
' "$SOURCE")"

TARGETS=(
  "$ROOT/docs/agent-instructions.md"
  "$ROOT/.github/cursor-instructions.md"
  "$ROOT/claude.md"
)

for target in "${TARGETS[@]}"; do
  mkdir -p "$(dirname "$target")"
  {
    echo "$BANNER"
    echo ""
    printf '%s\n' "$BODY"
  } > "$target"
  echo "Synced: $target"
done

echo "Done. All instruction files synced from .cursor/rules/project-guidelines.mdc"
