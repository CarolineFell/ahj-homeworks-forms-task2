import Goods from '../Goods';

test('Should add product', () => {
  const goods = new Goods();
  goods.addGood('Samsung A7', 30000);
  const received = goods.arrayGoods[0].name;
  const expected = 'Samsung A7';
  expect(received).toBe(expected);
});