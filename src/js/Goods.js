// push all new products to an array
import Product from './Product';

export default class Goods {
  constructor() {
    this.arrayGoods = [];
  }

  addGood(name, price) {
    this.arrayGoods.push(new Product(this.arrayGoods.length, name, price)); // this.arrayGoods.length -> position of the new product
  }
}