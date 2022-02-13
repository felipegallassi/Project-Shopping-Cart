const cartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function salvaCarrinho() {
  saveCartItems(cartItems.innerHTML);
}



function cartItemClickListener(event) {
  event.target.remove();
  salvaCarrinho();

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function restauraCarrinho() {
  const innerHTML = getSavedCartItems();
  if (innerHTML) {
    cartItems.innerHTML = innerHTML;
    for (let i = 0; i < cartItems.children.length; i += 1) {
      cartItems.children[i].addEventListener('click', cartItemClickListener);
    }
  }
}

async function colocaNoCarrinho(ItemID) {
  const lista = document.querySelector('.cart__items');
  const item = await fetchItem(ItemID);
  const { id: sku, title: name, price: salePrice } = item;
  const li = createCartItemElement({ sku, name, salePrice });
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  salvaCarrinho();
}

async function listaProdutos(query) {
  const items = document.querySelector('section .items');
  const produtos = await fetchProducts(query);
  produtos.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    const item = createProductItemElement({ sku, name, image });
    const botao = item.lastChild;
    botao.addEventListener('click', () => colocaNoCarrinho(sku));
    items.appendChild(item);
  });
}

const executaTudo = async () => {
  restauraCarrinho();
  await listaProdutos('computador');
};

window.onload = () => { executaTudo(); };