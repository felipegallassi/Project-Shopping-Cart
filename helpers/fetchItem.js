const fetchItem = async (ItemID) => {
  if (ItemID === undefined) {
    return new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  const response = await fetch(url);
  return response.json(); 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
