#!/usr/bin/env node
// Usage: node scripts/atlas.mjs <validate|build|check|links> [--json]
// build rewrites the generated blocks in README.md; check exits 1 if README is stale.
// links exits 1 on broken links; links it could not reach (403/429/timeouts) are reported as unverified.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const routesDoc = readJson('data/routes.json');
const resourcesDoc = readJson('data/resources.json');

const STATUSES = ['live', 'beta', 'community', 'retiring', 'dead'];
const OPERATIONS = ['motion-graphics', 'record', 'generate-footage', 'presenter', 'audio', 'edit', 'compose', 'publish'];
// The widest UTC offset is +14h, so "today" anywhere on Earth is at most this UTC date.
const latestValidDate = () => new Date(Date.now() + 14 * 3_600_000).toISOString().slice(0, 10);
const STRING_FIELDS = ['id', 'family', 'name', 'howFromClaude', 'access', 'cost', 'status', 'evidence', 'checkedOn', 'url', 'notes'];
const ARRAY_FIELDS = ['operations', 'makes', 'notFor'];
const BOOLEAN_FIELDS = ['exactText', 'reproducible'];
const MAX_AGE_DAYS = 45;
const DAY_MS = 86_400_000;

function dateProblem(value, now = Date.now()) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'is not a YYYY-MM-DD date';
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed) || new Date(parsed).toISOString().slice(0, 10) !== value) return 'is not a real calendar date';
  if (value > latestValidDate()) return 'is in the future';
  const ageDays = (now - parsed) / DAY_MS;
  if (ageDays > MAX_AGE_DAYS) return `is older than ${MAX_AGE_DAYS} days; re-verify`;
  return null;
}

function validateRoute(r, families, evidenceLevels) {
  if (r === null || typeof r !== 'object' || Array.isArray(r)) return ['a route must be an object'];
  const id = typeof r.id === 'string' ? r.id : '?';
  const errors = [];
  for (const f of STRING_FIELDS) if (typeof r[f] !== 'string' || !r[f].trim()) errors.push(`${id}: ${f} must be a non-empty string`);
  for (const f of ARRAY_FIELDS) if (!Array.isArray(r[f]) || !r[f].every((x) => typeof x === 'string')) errors.push(`${id}: ${f} must be an array of strings`);
  for (const f of BOOLEAN_FIELDS) if (typeof r[f] !== 'boolean') errors.push(`${id}: ${f} must be true or false`);
  if (errors.length) return errors;
  if (!families[r.family]) errors.push(`${id}: unknown family ${r.family}`);
  if (!evidenceLevels[r.evidence]) errors.push(`${id}: unknown evidence level ${r.evidence}`);
  if (!STATUSES.includes(r.status)) errors.push(`${id}: unknown status ${r.status}`);
  for (const op of r.operations) if (!OPERATIONS.includes(op)) errors.push(`${id}: unknown operation ${op}`);
  if (r.status !== 'dead' && r.operations.length === 0) errors.push(`${id}: a route that is not dead needs at least one operation`);
  if (!/^https:\/\//.test(r.url)) errors.push(`${id}: url must be https`);
  if (r.status !== 'dead' && r.makes.length === 0) errors.push(`${id}: a route that is not dead must make something`);
  const problem = dateProblem(r.checkedOn);
  if (problem) errors.push(`${id}: checkedOn ${r.checkedOn} ${problem}`);
  return errors;
}

function validate() {
  const { routes, families, evidenceLevels } = routesDoc;
  const { resources, categories } = resourcesDoc;
  const errors = [];
  if (!Array.isArray(routes) || !families || !evidenceLevels) return ['routes.json needs routes[], families{} and evidenceLevels{}'];
  if (!Array.isArray(resources) || !categories) return ['resources.json needs resources[] and categories{}'];
  const ids = new Set();
  for (const r of routes) {
    errors.push(...validateRoute(r, families, evidenceLevels));
    if (r === null || typeof r !== 'object') continue;
    if (ids.has(r.id)) errors.push(`${r.id}: duplicate id`);
    ids.add(r.id);
  }
  const urls = new Set();
  for (const x of resources) {
    if (x === null || typeof x !== 'object') { errors.push('a resource must be an object'); continue; }
    for (const f of ['category', 'name', 'url', 'why']) if (typeof x?.[f] !== 'string' || !x[f].trim()) errors.push(`${x?.name ?? '?'}: ${f} must be a non-empty string`);
    if (!categories[x.category]) errors.push(`${x.name}: unknown category ${x.category}`);
    if (!/^https:\/\//.test(x.url ?? '')) errors.push(`${x.name}: url must be https`);
    if (urls.has(x.url)) errors.push(`${x.name}: duplicate url`);
    urls.add(x.url);
  }
  for (const [label, doc] of [['routes.json', routesDoc], ['resources.json', resourcesDoc]]) {
    const problem = dateProblem(doc.verifiedOn);
    if (problem) errors.push(`${label}: verifiedOn ${doc.verifiedOn} ${problem}`);
  }
  return errors;
}

const cell = (s) => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
const yesNo = (b) => (b ? 'yes' : 'no');
const title = (s) => s.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());

function renderRoutes() {
  const { routes, families } = routesDoc;
  const out = [];
  for (const [family, blurb] of Object.entries(families)) {
    const rows = routes.filter((r) => r.family === family);
    if (!rows.length) continue;
    out.push(`### ${title(family)}`, '', blurb, '');
    out.push('| Route | Makes | Exact text | Access | Status | Evidence |', '|---|---|---|---|---|---|');
    for (const r of rows) {
      out.push(`| [${cell(r.name)}](${r.url}) | ${cell(r.makes.join(', ') || '-')} | ${yesNo(r.exactText)} | ${cell(r.access)} | ${r.status} | ${r.evidence} |`);
    }
    out.push('');
  }
  out.push('**Evidence levels:** ' + Object.entries(routesDoc.evidenceLevels).map(([k, v]) => `\`${k}\` ${v}`).join(' '));
  return out.join('\n').trimEnd();
}

function renderResources() {
  const { resources, categories } = resourcesDoc;
  const out = [];
  for (const [category, blurb] of Object.entries(categories)) {
    const rows = resources.filter((x) => x.category === category);
    if (!rows.length) continue;
    out.push(`### ${title(category)}`, '', blurb, '');
    for (const x of rows) out.push(`- [${x.name}](${x.url}): ${x.why}`);
    out.push('');
  }
  return out.join('\n').trimEnd();
}

function renderCounts() {
  const { routes, families } = routesDoc;
  const usable = routes.filter((r) => !['dead', 'retiring'].includes(r.status)).length;
  const documented = routes.filter((r) => r.evidence === 'documented' || r.evidence === 'tested').length;
  return `${usable} usable routes across ${Object.keys(families).length} families (${documented} confirmed on the provider's own page), ${resourcesDoc.resources.length} linked resources, verified ${routesDoc.verifiedOn}.`;
}

function render(readme) {
  const blocks = { routes: renderRoutes(), resources: renderResources(), counts: renderCounts() };
  let next = readme;
  for (const [name, body] of Object.entries(blocks)) {
    const re = new RegExp(`(<!-- generated:${name} -->)[\\s\\S]*?(<!-- /generated:${name} -->)`);
    if (!re.test(next)) throw new Error(`README is missing the generated:${name} markers`);
    next = next.replace(re, (_, open, close) => `${open}\n${body}\n${close}`);
  }
  return next;
}

async function probe(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15_000), headers: { 'user-agent': 'Mozilla/5.0 (awesome-ai-video-routes link check)' } });
      if (res.status !== 429 || attempt === 1) return { status: res.status };
    } catch (err) {
      if (attempt === 1) return { status: 0, error: err.name };
    }
    await new Promise((r) => setTimeout(r, 2_000));
  }
  return { status: 0, error: 'unreachable' };
}

async function links() {
  const targets = [
    ...routesDoc.routes.map((r) => ({ id: r.id, url: r.url })),
    ...resourcesDoc.resources.map((x) => ({ id: x.name, url: x.url })),
  ];
  const results = await Promise.all(targets.map(async (t) => {
    const { status, error } = await probe(t.url);
    const verdict = status >= 200 && status < 400 ? 'ok' : [0, 403, 429].includes(status) ? 'unverified' : 'broken';
    return { ...t, status, error, verdict };
  }));
  return results;
}

const [cmd = 'validate'] = process.argv.slice(2);
const asJson = process.argv.includes('--json');
const readmePath = join(root, 'README.md');

if (cmd === 'validate') {
  const errors = validate();
  console.log(asJson ? JSON.stringify({ ok: !errors.length, errors }) : errors.join('\n') || `ok: ${renderCounts()}`);
  process.exit(errors.length ? 1 : 0);
} else if (cmd === 'build' || cmd === 'check') {
  const errors = validate();
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  const current = readFileSync(readmePath, 'utf8');
  const next = render(current);
  if (cmd === 'build') { writeFileSync(readmePath, next); console.log('README.md rebuilt'); }
  else if (next !== current) { console.error('README.md is stale: run node scripts/atlas.mjs build'); process.exit(1); }
  else console.log('README.md is current');
} else if (cmd === 'links') {
  const results = await links();
  const count = (v) => results.filter((r) => r.verdict === v).length;
  if (asJson) console.log(JSON.stringify({ ok: !count('broken'), results }));
  else {
    for (const r of results.filter((x) => x.verdict !== 'ok')) console.log(`${r.verdict}\t${r.status || r.error}\t${r.id}\t${r.url}`);
    console.log(`ok ${count('ok')} · unverified ${count('unverified')} · broken ${count('broken')}`);
  }
  process.exit(count('broken') ? 1 : 0);
} else {
  console.error(`unknown command ${cmd}; use validate, build, check or links`);
  process.exit(2);
}
