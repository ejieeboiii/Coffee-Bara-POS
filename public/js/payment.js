// Shared by Cash, QR and Card: saves the sale in SQLite, then shows Payment Successful.
import { state } from './state.js';
import { saveTransaction } from './api.js';
import { showScreen } from './router.js';
import { toast } from './utils.js';

let busy = false;

export function requireOrder() {
  if (state.cart.length) return true;
  toast('Your order is empty. Please add an item first.', 'error');
  return false;
}

export async function completePayment(method, paid) {
  if (busy) return false;
  busy = true;
  try {
    state.method = method;
    state.receipt = await saveTransaction({ method, paid, items: state.cart });
    showScreen('success');
    toast('Payment successful', 'success');
    return true;
  } catch (err) {
    toast(err.message, 'error');
    return false;
  } finally {
    busy = false;
  }
}
