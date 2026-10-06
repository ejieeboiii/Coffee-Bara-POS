import { state } from '../state.js';
import { $, peso, METHOD_NAMES } from '../utils.js';
import { showScreen } from '../router.js';

export function init() { $('receipt-new').onclick = () => showScreen('welcome'); }

export function enter() {
  const r = state.receipt;
  if (!r) return;
  const rows = r.items.map((i) => `
    <div>${i.name}</div>
    <div class="row"><span>${i.qty} × ${peso(i.price)}</span><span>${peso(i.subtotal)}</span></div>`).join('');
  $('receipt').innerHTML = `
    <h3>Coffee Bara POS</h3>
    <div class="row"><span>Ref:</span><span>${r.reference}</span></div>
    <div class="row"><span>Date:</span><span>${r.createdAt}</span></div>
    <hr>${rows}<hr>
    <div class="row"><strong>TOTAL</strong><strong>${peso(r.total)}</strong></div>
    <div class="row"><span>Payment method</span><span>${METHOD_NAMES[r.method]}</span></div>
    <div class="row"><span>Amount paid</span><span>${peso(r.paid)}</span></div>
    <div class="row"><span>Change</span><span>${peso(r.change)}</span></div>
    <hr><div class="status">✓ ${r.status.toUpperCase()}</div>`;
}

