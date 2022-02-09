require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts é uma função',() => {
  	expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada',async () => {
  	await fetchProducts('computador');
  	expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async() => {
  	const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
  	await fetchProducts('computador');
  	expect(fetch).toHaveBeenCalledWith(url);
  });
  it('O retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo',async() => {
  	const mySearch = await fetchProducts('computador');
  	expect(mySearch).toEqual(computadorSearch.results);
  });
  it('Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url',async () => {
  	expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
