import { state } from './state.js';
import { getProducts } from './api.js';
import { loadScreens, showScreen } from './router.js';

(async () => {
  try {
    state.products = await getProducts();
    await loadScreens();
    showScreen('welcome');
  } catch {
    document.getElementById('app').textContent = 'Cannot reach the server. Run "npm start", then open http://localhost:3000';
  }
})();
