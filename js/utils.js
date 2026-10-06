export const $ = (id) => document.getElementById(id);
export const peso = (n) => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const toCents = (n) => Math.round(n * 100);        // avoids floating-point mistakes
export const AMOUNT = /^\d+(\.\d{1,2})?$/;                  // digits with up to 2 decimals
export const METHOD_NAMES = { cash: 'Cash', qr: 'QR Payment', card: 'Credit/Debit Card' };

let timer;
export function toast(message, type = '') {
  const t = $('toast');
  t.textContent = message;
  t.className = 'toast show ' + type;
  clearTimeout(timer);
  timer = setTimeout(() => (t.className = 'toast'), 2200);
}
