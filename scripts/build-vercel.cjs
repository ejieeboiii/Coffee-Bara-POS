// Publish only the frontend. Never copy the database, backend, or development files.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
// This target is a fixed generated directory inside the project.
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Invalid output directory.');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const name of ['index.html', 'assets', 'brand', 'css', 'js', 'screens']) {
  fs.cpSync(path.join(root, name), path.join(output, name), { recursive: true });
}
const products = require('../js/data/menu.json').map((p, index) => ({ ...p, id: index + 1 }));
fs.mkdirSync(path.join(output, 'api'));
fs.writeFileSync(path.join(output, 'api/products.json'), JSON.stringify(products));
console.log(`Vercel frontend built in dist with ${products.length} products; SQLite files are excluded.`);
