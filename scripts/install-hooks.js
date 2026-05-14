#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const HOOKS_DIR = path.join(ROOT, '.git', 'hooks');
const HOOK_PATH = path.join(HOOKS_DIR, 'pre-commit');
const MARKER    = '# managed by scripts/install-hooks.js';

const HOOK_CONTENT = `#!/bin/sh
${MARKER}

REPO_ROOT=$(git rev-parse --show-toplevel)

echo "[hook] Updating README.md..."
node "$REPO_ROOT/scripts/update-readme.js" || exit 1

git add "$REPO_ROOT/README.md"
`;

// ─── Guards ───────────────────────────────────────────────────────────────────

if (!fs.existsSync(path.join(ROOT, '.git'))) {
  console.error('✗ Not a git repository (no .git/ found)');
  process.exit(1);
}

if (!fs.existsSync(HOOKS_DIR)) {
  console.error('✗ .git/hooks/ directory not found');
  process.exit(1);
}

// ─── Back up any existing hook that is not ours ───────────────────────────────

if (fs.existsSync(HOOK_PATH)) {
  const existing = fs.readFileSync(HOOK_PATH, 'utf8');
  if (!existing.includes(MARKER)) {
    const backup = HOOK_PATH + '.bak';
    fs.renameSync(HOOK_PATH, backup);
    console.log(`! Existing pre-commit hook backed up → .git/hooks/pre-commit.bak`);
  }
}

// ─── Install ──────────────────────────────────────────────────────────────────

fs.writeFileSync(HOOK_PATH, HOOK_CONTENT);
fs.chmodSync(HOOK_PATH, 0o755);

console.log('✓ pre-commit hook installed (.git/hooks/pre-commit)');
console.log('  → runs node scripts/update-readme.js and stages README.md before every commit');
