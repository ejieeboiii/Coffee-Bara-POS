import { lines, total } from '../state.js';
import { $, peso } from '../utils.js';
import { showScreen } from '../router.js';
import { requireOrder } from '../payment.js';

export function init() {
  $('summary-back').onclick = () => showScreen('select');      // cart is kept in state
  $('summary-next').onclick = () => { if (requireOrder()) showScreen('method'); };
}
export function enter() {
  $('summary-body').innerHTML = lines().map((l) =>
    `<tr><td>${l.name}</td><td>${l.qty}</td><td>${peso(l.price)}</td><td>${peso(l.subtotal)}</td></tr>`).join('');
  $('summary-total').textContent = peso(total());
}
