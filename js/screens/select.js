import { state, product, lines, total } from '../state.js';
import { $, peso, toast } from '../utils.js';
import { showScreen } from '../router.js';
import { requireOrder } from '../payment.js';

let activeCategory = 'all';

export function init() {
  // Older API responses omit categories; categorize the same existing objects.
  state.products.forEach((p) => {
    const category = (p.category || '').trim().toLowerCase();
    if (['drinks', 'food', 'sides', 'combos'].includes(category)) {
      p.category = category;
    } else if (/\b(coffee|drink|water|americano|latte|cappuccino|mocha|tea|lemonade|juice)\b|\bchocolate$/i.test(p.name)) {
      p.category = 'drinks';
    } else if (/burger|sandwich|wrap|spaghetti|carbonara|macaroni$|grilled cheese|rice bowl|meal|fried rice/i.test(p.name)) {
      p.category = 'food';
    } else {
      p.category = 'sides';
    }
    const imageFolder = p.category === 'combos' ? 'combos/' : '';
    p.image ||= `assets/images/products/${imageFolder}${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`;
  });
  $('screen-select').addEventListener('input', (e) => {
    if (e.target.matches('[data-menu-search]')) renderProducts();
  });
  $('screen-select').addEventListener('click', (e) => {
    const category = e.target.closest('[data-category]');
    if (!category) return;
    activeCategory = category.dataset.category;
    $('screen-select').querySelectorAll('[data-category]').forEach((button) => {
      const selected = button === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    renderProducts();
  });
  $('screen-select').addEventListener('click', (e) => {
    const el = e.target.closest('[data-product],[data-action]');
    if (!el) return;
    const id = Number(el.dataset.product || el.dataset.id);
    const line = state.cart.find((l) => l.id === id);
    switch (el.dataset.action || 'add') {
      case 'add':
        if (line) line.qty++; else state.cart.push({ id, qty: 1 });
        toast(product(id).name + ' added', 'success'); break;
      case 'inc': line.qty++; break;
      case 'dec': line.qty = Math.max(1, line.qty - 1); break;   // never negative
      case 'remove':
        state.cart = state.cart.filter((l) => l !== line);
        toast(product(id).name + ' removed'); break;
      case 'review':
        if (requireOrder()) showScreen('summary');
        return;
    }
    renderCart();
  });
}

export function enter() {
  renderProducts();
  renderCart();
}

export function resetSelection() {
  activeCategory = 'all';
  $('screen-select').querySelector('[data-menu-search]').value = '';
  $('screen-select').querySelectorAll('[data-category]').forEach((button) => {
    const selected = button.dataset.category === 'all';
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  renderProducts();
  renderCart();
}

function renderProducts() {
  const search = $('screen-select').querySelector('[data-menu-search]').value.trim().toLocaleLowerCase();
  const products = state.products.filter((p) => {
    const name = p.name.toLocaleLowerCase();
    const category = (p.category || '').trim().toLowerCase();
    return (activeCategory === 'all' || category === activeCategory) && name.includes(search);
  });
  $('product-grid').innerHTML = products.map((p) => `
    <button class="product-card" data-product="${p.id}">
      <span class="product-art"><img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"></span>
      <span class="product-info"><span class="name">${p.name}</span>${p.category === 'combos' ? `<span class="combo-description">${p.description}</span>` : ''}<span class="price">${peso(p.price)}</span>
      <span class="add-label"><span aria-hidden="true">+</span> Add to order</span></span>
    </button>`).join('');
  $('screen-select').querySelector('[data-empty-results]').hidden = products.length > 0;
}

function renderCart() {
  const items = lines();
  $('screen-select').querySelector('[data-action="review"]').disabled = state.cart.length === 0;
  $('cart-empty').style.display = items.length ? 'none' : 'block';
  $('cart-list').innerHTML = items.map((l) => `
    <li class="cart-item">
      <div class="top"><span>${l.name}</span><span>${peso(l.subtotal)}</span></div>
      <div class="unit">${peso(l.price)} each</div>
      <div class="controls">
        <button class="qty-btn" data-action="dec" data-id="${l.id}" ${l.qty <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">−</button>
        <span class="qty">${l.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${l.id}" aria-label="Increase quantity">+</button>
        <button class="remove-btn" data-action="remove" data-id="${l.id}">Remove</button>
      </div>
    </li>`).join('');
  $('cart-total').textContent = peso(total());
}
