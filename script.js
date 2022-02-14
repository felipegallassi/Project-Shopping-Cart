const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

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

// function getSkuFromProductItem(item) {
  // return item.querySelector('span.item__sku').innerText;
// }

function salvaCarrinho() {
  saveCartItems(cartItems.innerHTML);
}

function somaValor(valor) {
  totalPrice.innerText = (parseFloat(totalPrice.innerText) + parseFloat(valor))
    .toFixed(2).toString();
}

function subtraiValor(valor) {
  totalPrice.innerText = (parseFloat(totalPrice.innerText) - parseFloat(valor))
    .toFixed(2).toString();
}

function somaTotal() {
  let soma = 0;
  let valor;
  const items = document.getElementsByClassName('cart__item');
  for (let index = 0; index < items.length; index += 1) {
    valor = items[index].innerText.split('PRICE: $');
    soma += parseFloat(valor[valor.length - 1]);
  }
  totalPrice.innerText = soma.toFixed(2).toString();
}

function cartItemClickListener(event) {
  let valor;
  valor = event.target.innerText.split('PRICE: $');
  valor = parseFloat(valor[valor.length - 1]);
  subtraiValor(valor);
  event.target.remove();
  salvaCarrinho();
}

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

function beginLoading(sectionItems) {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  sectionItems.appendChild(p);
}

function endLoading(sectionItems) {
  for (let index = sectionItems.children.length; index > 0; index -= 1) {
    sectionItems.children[index - 1].remove();
  }
}

async function colocaNoCarrinho(ItemID) {
  const item = await fetchItem(ItemID);
  const { id: sku, title: name, price: salePrice } = item;
  const li = createCartItemElement({ sku, name, salePrice });
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  somaValor(salePrice);
  salvaCarrinho();
}

async function listaProdutos(query) {
  const items = document.querySelector('section .items');
  beginLoading(items);
  const produtos = await fetchProducts(query);
  endLoading(items);
  produtos.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    const item = createProductItemElement({ sku, name, image });
    const botao = item.lastChild;
    botao.addEventListener('click', () => colocaNoCarrinho(sku));
    items.appendChild(item);
  });
}

function EsvaziarCarrinho() {
  cartItems.innerHTML = '';
  totalPrice.innerText = '0.00';
  salvaCarrinho();
}

const executaTudo = async () => {
  restauraCarrinho();
  somaTotal();
  await listaProdutos('computador');
  document.querySelector('.empty-cart').addEventListener('click', EsvaziarCarrinho);
};

window.onload = () => { executaTudo(); };