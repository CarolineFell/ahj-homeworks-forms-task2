/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import Goods from './Goods';
import defaultGoods from './defaultGoods';
import Display from './Display';
import Popovers from './Popovers';
import ProductDelete from './ProductDelete';

const goods = new Goods();
const display = new Display();
const popovers = new Popovers(document.body);
const productDelete = new ProductDelete();

export default class ListEditor {
  constructor() {
    this.tbody = document.querySelector('tbody');
    this.addProduct = document.querySelector('.add-product');
    this.id = -1;
    this.itemIndex = '';
  }

  init() {
    defaultGoods(goods);
    display.displayProducts(goods.arrayGoods);
    popovers.bindToDOM();
    popovers.saveProduct(this.saveProduct.bind(this));
    this.inputName = document.getElementById('input-name');
    this.inputPrice = document.getElementById('input-price');
    productDelete.init();
    this.eventsGoods();
  }

  eventsGoods() {
    this.tbody.addEventListener('click', (e) => {
      const eTargetClass = e.target.classList;
      this.id = Number(e.target.closest('tr').dataset.id);
      // edit the product
      if (eTargetClass.contains('edit-product')) {
        this.itemIndex = this.findProductIndex(this.id);
        this.inputName.value = goods.arrayGoods[this.itemIndex].name;
        this.inputPrice.value = goods.arrayGoods[this.itemIndex].price;
        console.log('edit product');
        popovers.showPopup();
      }
      // delete the product
      if (eTargetClass.contains('delete-product')) {
        productDelete.delElement(this.delProduct.bind(this));
        console.log('delete product');
      }
    });

    this.addProduct.addEventListener('click', () => {
      this.id = -1;
      console.log('create new product');
      popovers.clearInput();
      popovers.showPopup();
    });
  }

  delProduct() {
    goods.arrayGoods = goods.arrayGoods.filter((item) => item.id !== this.id);
    display.displayProducts(goods.arrayGoods);
  }

  saveProduct() {
    if (this.id >= 0) {
      // change the product data
      goods.arrayGoods[this.itemIndex].name = this.inputName.value;
      goods.arrayGoods[this.itemIndex].price = Number(this.inputPrice.value);
      console.log('edited');
    } else {
      // save new product
      goods.addGood(this.inputName.value, Number(this.inputPrice.value));
      console.log('added');
    }
    display.displayProducts(goods.arrayGoods);
  }

  findProductIndex(id) {
    return goods.arrayGoods.findIndex((item) => item.id === id);
  }
}