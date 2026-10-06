// The single place that holds the current customer's order.
export const state = { products: [], cart: [], method: null, receipt: null };   // cart: [{ id, qty }]

export const product = (id) => state.products.find((p) => p.id === id);

// Subtotal = Unit Price × Quantity
export const lines = () => state.cart.map((l) => {
  const p = product(l.id);
  return { id: p.id, name: p.name, price: p.price, qty: l.qty, subtotal: p.price * l.qty };
});
// Total = sum of all subtotals
export const total = () => lines().reduce((sum, l) => sum + l.subtotal, 0);

export function resetOrder() { state.cart = []; state.method = null; state.receipt = null; }
