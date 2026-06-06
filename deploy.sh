#!/usr/bin/env bash
# Sync this site/ folder into the Git clone (kept OUTSIDE Google Drive to avoid
# .git sync churn) and push to GitHub Pages.
#
# Usage:  ./deploy.sh
# Override the clone location with:  REPO_DIR=/path/to/clone ./deploy.sh
set -euo pipefail

REPO_DIR="${REPO_DIR:-$HOME/Code/az-ai-guidance-companion}"
REMOTE="https://github.com/lukeallpress/az-ai-guidance-companion.git"
SRC="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "Cloning $REMOTE -> $REPO_DIR"
  mkdir -p "$(dirname "$REPO_DIR")"
  git clone "$REMOTE" "$REPO_DIR"
fi

echo "Syncing site -> $REPO_DIR"
rsync -a --delete --exclude '.git' "$SRC"/ "$REPO_DIR"/

cd "$REPO_DIR"
git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi
git commit -m "Update companion site"
git push origin main
echo "Deployed → https://lukeallpress.github.io/az-ai-guidance-companion/"
