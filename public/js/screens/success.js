import { state } from '../state.js';
import { $, peso, METHOD_NAMES } from '../utils.js';
import { showScreen } from '../router.js';

export function init() { $('success-receipt').onclick = () => showScreen('receipt'); }
export function enter() {
  const r = state.receipt;
  if (!r) return;
  $('ok-total').textContent = peso(r.total);
  $('ok-paid').textContent = peso(r.paid);
  $('ok-change').textContent = peso(r.change);
  $('ok-method').textContent = METHOD_NAMES[r.method];
  $('ok-ref').textContent = r.reference;
}
