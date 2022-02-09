const fetchProducts = async (query) => {
  if (query === undefined) {
    return new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
  const produtos = await response.json();
  return produtos.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
