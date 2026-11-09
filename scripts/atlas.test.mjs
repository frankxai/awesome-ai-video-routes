import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');

function withRoutes(mutate) {
  const dir = mkdtempSync(join(tmpdir(), 'atlas-'));
  for (const p of ['scripts', 'data', 'README.md']) cpSync(join(repo, p), join(dir, p), { recursive: true });
  const file = join(dir, 'data/routes.json');
  const doc = JSON.parse(readFileSync(file, 'utf8'));
  mutate(doc);
  writeFileSync(file, JSON.stringify(doc, null, 2));
  return dir;
}

function run(dir, cmd) {
  const res = spawnSync(process.execPath, [join(dir, 'scripts/atlas.mjs'), cmd], { encoding: 'utf8' });
  return { code: res.status, out: res.stdout + res.stderr };
}

const today = new Date().toISOString().slice(0, 10);
const cases = [
  ['string instead of boolean', (d) => { d.routes[0].exactText = 'false'; }, /exactText must be true or false/],
  ['string instead of array', (d) => { d.routes[0].makes = 'not-an-array'; }, /makes must be an array/],
  ['missing field', (d) => { delete d.routes[0].makes; }, /makes must be an array/],
  ['future verifiedOn', (d) => { d.verifiedOn = '2099-01-01'; }, /is in the future/],
  ['stale row', (d) => { d.routes[0].checkedOn = '2020-01-01'; }, /older than 45 days/],
  ['unknown evidence', (d) => { d.routes[0].evidence = 'vibes'; }, /unknown evidence level/],
  ['null route', (d) => { d.routes.push(null); }, /a route must be an object/],
  ['unknown operation', (d) => { d.routes[0].operations = ['teleport']; }, /unknown operation teleport/],
  ['impossible date', (d) => { d.routes[0].checkedOn = '2026-09-31'; }, /not a real calendar date/],
  ['date two days ahead', (d) => { d.routes[0].checkedOn = new Date(Date.now() + 2 * 86_400_000).toISOString().slice(0, 10); }, /is in the future/],
];

for (const [name, mutate, expected] of cases) {
  test(`validate rejects ${name}`, () => {
    const dir = withRoutes((d) => { d.verifiedOn = today; d.routes.forEach((r) => { r.checkedOn = today; }); mutate(d); });
    try {
      const { code, out } = run(dir, 'validate');
      assert.equal(code, 1);
      assert.match(out, expected);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
}

test('build keeps $ replacement tokens literal', () => {
  const dir = withRoutes((d) => { d.verifiedOn = today; d.routes.forEach((r) => { r.checkedOn = today; }); d.routes[0].name = 'Costs $& and $1 and $$'; });
  try {
    assert.equal(run(dir, 'build').code, 0);
    assert.match(readFileSync(join(dir, 'README.md'), 'utf8'), /Costs \$& and \$1 and \$\$/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the committed README matches the data', () => {
  const { code, out } = run(repo, 'check');
  assert.equal(code, 0, out);
});
