// Loads every screen (HTML + JS module) once, then shows one at a time.
import { $ } from './utils.js';

const SCREENS = ['welcome', 'select', 'summary', 'method', 'cash', 'qr', 'card', 'success', 'receipt'];
const LABELS = {
  welcome: '',
  select: 'Step 1 of 5 · Choose items', summary: 'Step 2 of 5 · Review order',
  method: 'Step 3 of 5 · Payment method', cash: 'Step 4 of 5 · Cash payment',
  qr: 'Step 4 of 5 · QR payment', card: 'Step 4 of 5 · Card payment',
  success: 'Step 5 of 5 · Payment successful', receipt: 'Receipt'
};
const modules = {};

export async function loadScreens() {
  for (const name of SCREENS) {
    const section = document.createElement('section');
    section.id = 'screen-' + name;
    section.className = 'screen';
    section.innerHTML = await (await fetch(`screens/${name}.html`)).text();
    $('app').append(section);
    modules[name] = await import(`./screens/${name}.js`);
    modules[name].init();                    // bind buttons once
  }
}

export function showScreen(name) {
  document.body.classList.toggle('welcome-mode', name === 'welcome');
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  $('screen-' + name).classList.add('active');
  $('step-label').textContent = LABELS[name];
  window.scrollTo(0, 0);
  modules[name].enter();                     // refresh the screen's content
}
