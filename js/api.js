// Localhost keeps the SQLite API; hosted static copies use the browser demo.
const localHosts = ['localhost', '127.0.0.1', '[::1]'];
export const isDemo = !localHosts.includes(window.location.hostname);
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}
export const getProducts = () => isDemo
  ? import('./demo.js').then((demo) => demo.getProducts())
  : request('api/products');
export const saveTransaction = (body) => isDemo
  ? import('./demo.js').then((demo) => demo.saveTransaction(body))
  : request('api/transactions', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});
