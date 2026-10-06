// Static-host adapter. It returns the same product/receipt shapes as the API.
const STORAGE_KEY = 'coffee-bara-demo-transactions';
const round2 = (n) => Math.round(n * 100) / 100;
let menu;

async function catalog() {
  if (!menu) {
    const response = await fetch(new URL('./data/menu.json', import.meta.url));
    if (!response.ok) throw new Error('Unable to load the demo menu.');
    menu = (await response.json()).map((p, index) => ({ ...p, id: index + 1 }));
  }
  return menu;
}

export async function getProducts() {
  // Screen setup may add image paths; keep the price catalog independent.
  return (await catalog()).map((p) => ({ ...p }));
}

export async function saveTransaction({ method, paid, items }) {
  if (!['cash', 'qr', 'card'].includes(method)) throw new Error('Invalid payment method.');
  if (!Array.isArray(items) || !items.length) throw new Error('Order is empty.');
  const products = await catalog();
  const lines = items.map((item) => {
    const p = products.find((p) => p.id === item.id), qty = Number(item.qty);
    if (!p || !Number.isInteger(qty) || qty < 1) throw new Error('Invalid item in order.');
    return { name: p.name, price: p.price, qty, subtotal: round2(p.price * qty) };
  });
  const total = round2(lines.reduce((sum, line) => sum + line.subtotal, 0));
  const amountPaid = method === 'cash' ? Number(paid) : total;
  if (!Number.isFinite(amountPaid) || amountPaid < 0) throw new Error('Invalid amount.');
  if (Math.round(amountPaid * 100) < Math.round(total * 100)) throw new Error('Insufficient payment.');

  let history;
  try {
    history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(history)) throw new Error('Invalid history.');
  } catch {
    throw new Error('Unable to read demo receipts. Check browser storage settings.');
  }
  const d = new Date(), pad = (n) => String(n).padStart(2, '0');
  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  const stamp = (date + time).replace(/[-:]/g, '');
  let reference;
  do {
    reference = `CAFE-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  } while (history.some((receipt) => receipt.reference === reference));
  const receipt = {
    reference, createdAt: `${date} ${time}`, method, total, paid: amountPaid,
    change: round2(amountPaid - total), status: 'Payment Successful', items: lines
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...history, receipt]));
  } catch {
    throw new Error('Unable to save the demo receipt. Check browser storage space and permissions.');
  }
  return receipt;
}
