CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL CHECK (price >= 0), icon TEXT,
  category TEXT NOT NULL DEFAULT 'drinks');
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  method TEXT NOT NULL CHECK (method IN ('cash','qr','card')),
  total REAL NOT NULL, amount_paid REAL NOT NULL, change_amount REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'Payment Successful',
  created_at TEXT NOT NULL DEFAULT (datetime('now','localtime')));
CREATE TABLE IF NOT EXISTS transaction_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id INTEGER NOT NULL REFERENCES transactions(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL, unit_price REAL NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0), subtotal REAL NOT NULL);
