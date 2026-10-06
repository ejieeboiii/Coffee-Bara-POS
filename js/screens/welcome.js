import { resetOrder } from '../state.js';
import { $, peso } from '../utils.js';
import { showScreen } from '../router.js';
import { resetSelection } from './select.js';

export function init() {
  $('welcome-start').onclick = () => {
    resetOrder();
    showScreen('select');
  };
}

export function enter() {
  resetOrder();
  resetSelection();
  // Clear the hidden screens as well as state, so no prior sale remains on display.
  ['summary-body', 'receipt'].forEach((id) => { $(id).innerHTML = ''; });
  ['ok-total', 'ok-paid', 'ok-change', 'ok-method', 'ok-ref', 'cash-error'].forEach((id) => {
    $(id).textContent = '';
  });
  ['summary-total', 'method-total', 'cash-total', 'cash-change', 'qr-total', 'card-total'].forEach((id) => {
    $(id).textContent = peso(0);
  });
  $('cash-input').value = '';
  $('card-instruction').textContent = 'Please tap, insert, or swipe your card.';
  $('card-instruction').classList.remove('processing');
  $('card-pay').disabled = false;
  $('card-back').disabled = false;
  $('toast').textContent = '';
  $('toast').className = 'toast';
}
