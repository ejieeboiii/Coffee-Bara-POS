import { state, total } from '../state.js';
import { $, peso } from '../utils.js';
import { showScreen } from '../router.js';

export function init() {
  $('method-back').onclick = () => showScreen('summary');
  $('screen-method').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-method]');
    if (!btn) return;
    state.method = btn.dataset.method;
    showScreen(state.method);
  });
}
export function enter() { $('method-total').textContent = peso(total()); }
