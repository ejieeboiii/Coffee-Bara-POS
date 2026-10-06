import { state } from '../state.js';
import { $, peso, METHOD_NAMES } from '../utils.js';
import { showScreen } from '../router.js';

export function init() {
  $('receipt-new').onclick = () => showScreen('welcome');
  $('receipt-print').onclick = () => { if (state.receipt) window.print(); };
}

const escapeText = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

export function enter() {
  const r = state.receipt;
  if (!r) { $('receipt').innerHTML = ''; return; }
  const rows = r.items.map((i) => `
    <li><div class="receipt-row"><strong>${escapeText(i.name)}</strong><strong>${peso(i.subtotal)}</strong></div>
    <div class="receipt-item-detail">${escapeText(i.qty)} × ${peso(i.price)}</div></li>`).join('');
  $('receipt').innerHTML = `
    <div class="receipt-brand"><img class="receipt-logo" src="assets/images/coffee-bara-logo.png" alt="Coffee Bara" width="110" height="110"><h3>SALES RECEIPT</h3></div>
    <dl class="receipt-section receipt-meta">
      <div class="receipt-row"><dt>Receipt no.</dt><dd>${escapeText(r.reference)}</dd></div>
      <div class="receipt-row"><dt>Date / time</dt><dd>${escapeText(r.createdAt)}</dd></div>
      <div class="receipt-row"><dt>Order type</dt><dd>${escapeText(r.orderType || 'Not recorded')}</dd></div>
    </dl>
    <section class="receipt-section" aria-label="Ordered items">
      <div class="receipt-row receipt-columns"><span>ITEM / QTY</span><span>AMOUNT</span></div>
      <ul class="receipt-items">${rows}</ul>
    </section>
    <section class="receipt-section" aria-label="Order summary">
      <div class="receipt-row"><span>Subtotal</span><span>${peso(r.total)}</span></div>
      <div class="receipt-row"><span>Discounts</span><span>${peso(0)}</span></div>
      <div class="receipt-row"><span>Additional tax</span><span>${peso(0)}</span></div>
      <div class="receipt-row receipt-total"><span>Total</span><span>${peso(r.total)}</span></div>
    </section>
    <section class="receipt-section" aria-label="Payment information">
      <div class="receipt-row"><span>Payment</span><strong>${escapeText(METHOD_NAMES[r.method])}</strong></div>
      <div class="receipt-row"><span>Amount paid</span><span>${peso(r.paid)}</span></div>
      <div class="receipt-row"><span>Change</span><span>${peso(r.change)}</span></div>
    </section>
    <footer class="receipt-section receipt-footer"><p class="receipt-status">✓ ${escapeText(r.status)}</p><p>Thank you for choosing Coffee Bara!</p></footer>`;
}

