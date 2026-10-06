import { total } from '../state.js';
import { $, peso } from '../utils.js';
import { showScreen } from '../router.js';
import { completePayment } from '../payment.js';

export function init() {
  $('qr-back').onclick = () => showScreen('method');
  $('qr-pay').onclick = () => completePayment('qr', total());   // simulated: paid = total
}
export function enter() { $('qr-total').textContent = peso(total()); }
