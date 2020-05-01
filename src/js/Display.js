// display the products
export default class Display {
  constructor() {
    this.tbody = document.querySelector('tbody');
  }

  displayProducts(arrayGoods) {
    this.tbody.innerHTML = '';
    for (const item of arrayGoods) { // taking one element of arrayProduct
      const product = document.createElement('tr');
      product.dataset.id = item.id;
      product.innerHTML = `
      <td>${item.name}</td>
      <td class="price">${item.price}</td>
      <td class="pointers">
        <span class="edit-product pointer"></span>
        <span class="delete-product pointer"></span>
      </td>
      `;
      this.tbody.appendChild(product);
    }
  }
}