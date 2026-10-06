import { total } from '../state.js';
import { $, peso, toast } from '../utils.js';
import { showScreen } from '../router.js';
import { completePayment } from '../payment.js';

let processing = false;

export function init() {
  $('card-back').onclick = () => showScreen('method');
  $('card-pay').onclick = pay;
}
export function enter() {
  processing = false;
  $('card-total').textContent = peso(total());
  $('card-instruction').textContent = 'Please tap, insert, or swipe your card.';
  $('card-instruction').classList.remove('processing');
  $('card-pay').disabled = false;
  $('card-back').disabled = false;
}

async function pay() {
  if (processing) return;
  processing = true;
  $('card-instruction').textContent = 'Processing payment...';
  $('card-instruction').classList.add('processing');
  $('card-pay').disabled = true;
  $('card-back').disabled = true;
  toast('Processing payment...');
  await new Promise((resolve) => setTimeout(resolve, 2000));    // simulated processing
  if (!(await completePayment('card', total()))) enter();        // on error, let the customer retry
}
