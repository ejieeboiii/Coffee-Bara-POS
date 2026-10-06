import { total } from '../state.js';
import { $, peso, toast, toCents, AMOUNT } from '../utils.js';
import { showScreen } from '../router.js';
import { completePayment } from '../payment.js';

export function init() {
  $('cash-back').onclick = () => showScreen('method');
  $('cash-pay').onclick = pay;
  $('cash-input').addEventListener('input', previewChange);
  $('cash-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') pay(); });
}
export function enter() {
  $('cash-total').textContent = peso(total());
  $('cash-input').value = '';
  $('cash-change').textContent = peso(0);
  $('cash-error').textContent = '';
}

// Change = Amount Paid − Total (shown only when the amount is valid and enough)
function previewChange() {
  const raw = $('cash-input').value.trim();
  const ok = AMOUNT.test(raw) && toCents(Number(raw)) >= toCents(total());
  $('cash-change').textContent = peso(ok ? Number(raw) - total() : 0);
  $('cash-error').textContent = '';
}
function fail(message) { $('cash-error').textContent = message; toast(message, 'error'); }

function pay() {
  const raw = $('cash-input').value.trim();
  if (raw === '') return fail('Please enter the amount paid.');
  if (raw.startsWith('-')) return fail('Invalid amount. Negative values are not allowed.');
  if (!AMOUNT.test(raw)) return fail('Invalid amount. Please enter numbers only, e.g. 150 or 150.50.');
  const paid = Number(raw);
  if (toCents(paid) < toCents(total())) return fail('Insufficient payment. Please enter at least ' + peso(total()) + '.');
  completePayment('cash', paid);
}
