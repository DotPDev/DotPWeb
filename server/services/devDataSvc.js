const printfulOrder = {
  recipient:  {
    name: 'AD Deadman',
    address1: '1337 Epic St',
    city: 'St. Louis',
    state_code: 'MO',
    country_code: 'US',
    zip: '63125'
  },
  items: [
    {
      variant_id: 6584, //black tshirt
      name: 'DotP T-Shirt', //Display name
      retail_price: '19.99', //Retail price for packing slip
      quantity: 1,
      files: [
        {url: 'https://d1yg28hrivmbqm.cloudfront.net/files/083/0839977f59f96553d1fe47bce3d50b5a_preview.png'},
        {type: 'preview', url: 'https://d1yg28hrivmbqm.cloudfront.net/files/1f1/1f10966e40bd27388eeae9a5352d7fbf_preview.png'}
      ]
    }
  ]
}

module.exports = {
  printfulOrder
}
