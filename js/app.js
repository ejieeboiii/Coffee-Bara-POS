import { state } from './state.js';
import { getProducts, isDemo } from './api.js';
import { loadScreens, showScreen } from './router.js';

(async () => {
  try {
    state.products = await getProducts();
    await loadScreens();
    showScreen('welcome');
  } catch {
    document.getElementById('app').textContent = isDemo
      ? 'Unable to load the demo. Please refresh and check that the project files are available.'
      : 'Cannot reach the server. Run "npm start", then open http://localhost:3000';
  }
})();
