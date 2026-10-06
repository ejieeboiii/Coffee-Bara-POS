// Opens (or creates) cafe.db and adds missing menu items without replacing orders.
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, 'cafe.db'));
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

if (!db.prepare('PRAGMA table_info(products)').all().some((column) => column.name === 'category')) {
  db.exec("ALTER TABLE products ADD COLUMN category TEXT NOT NULL DEFAULT 'drinks'");
}

const menu = require('./menu');
db.transaction(() => {
  db.prepare('UPDATE products SET category = LOWER(TRIM(category))').run();
  const find = db.prepare('SELECT id FROM products WHERE name = ?');
  const insert = db.prepare('INSERT INTO products (name, price, icon, category) VALUES (?, ?, ?, ?)');
  const categorize = db.prepare('UPDATE products SET category = ? WHERE id = ?');
  menu.forEach(({ name, price, icon, category }) => {
    const existing = find.get(name);
    if (existing) categorize.run(category, existing.id);
    else insert.run(name, price, icon, category);
  });
})();
module.exports = db;
