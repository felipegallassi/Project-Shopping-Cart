require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem é uma função', async() => {
  	expect(typeof fetchItem).toBe('function');
  });
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada',async () => {
  	await fetchItem('MLB1615760527');
  	expect(fetch).toHaveBeenCalled();
  });
  it('Ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint correto', async() => {
  	const url = "https://api.mercadolibre.com/items/MLB1615760527";
  	await fetchItem('MLB1615760527');
  	expect(fetch).toHaveBeenCalledWith(url);
  });
  it('O retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo',async() => {
  	const myItem = await fetchItem('MLB1615760527');
  	expect(myItem).toEqual(item);
  });
  it('Ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url',async () => {
  	expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });


});
