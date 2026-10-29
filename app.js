const products = [
  { id: 1, title: 'Ноутбук 15"', category: 'Компьютеры', price: 85067 },
  { id: 2, title: 'Монитор 27"', category: 'Компьютеры', price: 28067 },
  { id: 3, title: 'Клавиатура', category: 'Аксессуары', price: 6700 },
  { id: 4, title: 'маленькие наушники', category: 'Аксессуары', price: 2670 },
  { id: 5, title: 'Клавиатура механическая', category: 'Аксессуары', price: 9900 },
  { id: 6, title: '3d принтер', category: 'компьютеры', price: 67000 },
  { id: 7, title: 'RTX 6090 TI', category: 'хардвейр', price: 6700000 }
];

const cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.getElementById('catalog');
  const cartCount = document.getElementById('cart-count');
  const cartSum = document.getElementById('cart-sum');
  const clearCartButton = document.getElementById('clear-cart');

  if (!catalog || !cartCount || !cartSum || !clearCartButton) {
    document.body.insertAdjacentHTML('beforeend',
      '<p style="margin:20px;color:#b91c1c">Ошибка: не найдены нужные элементы HTML. Проверьте index.html.</p>');
    console.error('Не найдены элементы: catalog, cart-count, cart-sum или clear-cart.');
    return;
  }

  function renderProducts() {
    catalog.innerHTML = products.map(product => `
      <div class="card">
        <div class="category">${product.category}</div>
        <h3>${product.title}</h3>
        <div class="price">${product.price.toLocaleString('ru-RU')} ₽</div>
        <button type="button" data-id="${product.id}">В корзину</button>
      </div>
    `).join('');
  }

  function renderCart() {
    cartCount.textContent = cart.length;
    const sum = cart.reduce((total, product) => total + product.price, 0);
    cartSum.textContent = sum.toLocaleString('ru-RU');
  }

  catalog.addEventListener('click', event => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;

    const productId = Number(button.dataset.id);
    const product = products.find(item => item.id === productId);
    if (product) {
      cart.push(product);
      renderCart();
      console.log('В корзину добавлен товар:', product.title);
    }
  });

  clearCartButton.addEventListener('click', () => {
    cart.length = 0;
    renderCart();
  });

  renderProducts();
  renderCart();
});
