// Talks to the SQLite-backed server.
async function request(url, options) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}
export const getProducts = () => request('api/products');
export const saveTransaction = (body) => request('api/transactions', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});
