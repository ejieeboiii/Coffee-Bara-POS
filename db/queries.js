// All SQL lives here. The server recalculates prices/totals from the database,
// so the browser can never set its own prices.
const db = require('./database');
const menu = require('./menu');
const round2 = (n) => Math.round(n * 100) / 100;

function getProducts() {
  return db.prepare('SELECT id, name, price, icon, category FROM products ORDER BY id').all().map((p) => {
    const combo = p.category === 'combos' && menu.find((item) => item.name === p.name);
    return combo ? { ...p, description: combo.description, image: combo.image } : p;
  });
}

function newReference() {
  const d = new Date(), p = (n) => String(n).padStart(2, '0');
  const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  return `CAFE-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function createTransaction({ method, paid, items }) {
  if (!['cash', 'qr', 'card'].includes(method)) throw new Error('Invalid payment method.');
  if (!Array.isArray(items) || items.length === 0) throw new Error('Order is empty.');

  const findProduct = db.prepare('SELECT id, name, price FROM products WHERE id = ?');
  const lines = items.map((i) => {
    const p = findProduct.get(i.id), qty = Number(i.qty);
    if (!p || !Number.isInteger(qty) || qty < 1) throw new Error('Invalid item in order.');
    return { ...p, qty, subtotal: round2(p.price * qty) };
  });

  const total = round2(lines.reduce((s, l) => s + l.subtotal, 0));
  const amountPaid = method === 'cash' ? Number(paid) : total;
  if (!Number.isFinite(amountPaid) || amountPaid < 0) throw new Error('Invalid amount.');
  if (Math.round(amountPaid * 100) < Math.round(total * 100)) throw new Error('Insufficient payment.');
  const change = round2(amountPaid - total);

  const exists = db.prepare('SELECT 1 FROM transactions WHERE reference = ?');
  const insertTx = db.prepare('INSERT INTO transactions (reference, method, total, amount_paid, change_amount) VALUES (?,?,?,?,?)');
  const insertItem = db.prepare('INSERT INTO transaction_items (transaction_id, product_id, product_name, unit_price, quantity, subtotal) VALUES (?,?,?,?,?,?)');

  return db.transaction(() => {
    let reference;
    do { reference = newReference(); } while (exists.get(reference));   // never reuse a reference
    const id = insertTx.run(reference, method, total, amountPaid, change).lastInsertRowid;
    lines.forEach((l) => insertItem.run(id, l.id, l.name, l.price, l.qty, l.subtotal));
    const row = db.prepare('SELECT created_at FROM transactions WHERE id = ?').get(id);
    return {
      reference, createdAt: row.created_at, method, total, paid: amountPaid, change,
      status: 'Payment Successful',
      items: lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price, subtotal: l.subtotal }))
    };
  })();
}

module.exports = { getProducts, createTransaction };
