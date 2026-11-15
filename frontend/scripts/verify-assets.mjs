import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(readFileSync(resolve(root, 'docs/home-shell-assets.json'), 'utf8').replace(/^\uFEFF/, ''));
for (const asset of manifest) {
  const actual = createHash('sha256').update(readFileSync(resolve(root, asset.Path))).digest('hex').toUpperCase();
  if (actual !== asset.Hash) throw new Error(`Asset alterado: ${asset.Path}`);
}
const published = readdirSync(resolve(root, 'frontend/dist'), { recursive: true });
if (published.some(name => /\.(png|jpe?g)$/i.test(name))) throw new Error('Referência de imagem incluída no build');
console.log(`${manifest.length} hashes SHA-256 preservados; build sem imagens de referência.`);
