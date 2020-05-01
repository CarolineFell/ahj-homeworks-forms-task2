export default class ProductDel {
  init() {
    const deleteBlock = document.createElement('div');
    deleteBlock.id = 'delete';
    deleteBlock.className = 'popup hidden';
    deleteBlock.innerHTML = `
    <div id="close-delete"></div>
    <p>Удалить позицию?</p>
    <div class="buttons">
      <div id="button-delete" class="button">Удалить</div>
      <div id="button-cancel-delete" class="button">Отмена</div>
    </div>
    `;
    document.body.appendChild(deleteBlock);
    this.deleteItem = document.getElementById('delete');
    this.buttonDelete = document.getElementById('button-delete');
    this.buttonCancel = document.getElementById('button-cancel-delete');
    this.closeDelete = document.getElementById('close-delete');
  }

  delElement(callback) {
    // delete the item
    this.deleteItem.classList.remove('hidden');
    this.deleteItem.style.top = `${(window.innerHeight - this.deleteItem.offsetHeight) / 2}px`;
    this.deleteItem.style.left = `${(window.innerWidth - this.deleteItem.offsetWidth) / 2}px`;
    this.buttonDelete.addEventListener('click', () => {
      this.deleteItem.classList.add('hidden');
      callback();
    });

    // cancel the deleting
    this.buttonCancel.addEventListener('click', () => {
      this.deleteItem.classList.add('hidden');
    });

    // close the popup
    this.closeDelete.addEventListener('click', () => {
      this.deleteItem.classList.add('hidden');
    });
  }
}