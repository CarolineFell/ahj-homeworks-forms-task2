/* eslint-disable class-methods-use-this */
// open editor / adding popup
export default class Popovers {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.popup = document.createElement('div');
    this.savedProduct = '';
  }

  get htmlElement() {
    return `
      <div id="close-popup"></div>
      <p class="popup-name">Название</p>
      <input type="text" id="input-name" class="input" value="" placeholder="iPhone XR">
      <p class="popup-name">Стоимость</p>
      <input type="number" id="input-price" class="input" value="" min="1" placeholder="600000">        
      <div class="buttons">
        <div id="button-save" class="button">Сохранить</div>
        <div id="button-cancel" class="button">Отмена</div>
      </div>
    `;
  }

  addErrorElement(parentElement) {
    const error = document.createElement('div');
    error.id = 'form-error';
    error.className = 'form-error hidden';
    error.textContent = 'Error';
    parentElement.appendChild(error);
    // <div id="form-error" class="form-error hidden">Error</div>
  }

  saveProduct(callback) {
    this.savedProduct = callback;
  }

  bindToDOM() {
    this.popup.id = 'popup';
    this.popup.className = 'popup hidden';
    this.popup.innerHTML = this.htmlElement;
    this.addErrorElement(this.popup);
    // <div id="popup" class="popup hidden"> htmlElement </div>
    this.parentEl.appendChild(this.popup);
    this.constants();
    this.eventsPopup();
  }

  constants() {
    this.popupBlock = document.querySelector('#popup');
    this.closePopup = document.getElementById('close-popup');
    this.inputName = document.getElementById('input-name');
    this.inputPrice = document.getElementById('input-price');
    this.buttonSave = document.getElementById('button-save');
    this.buttonCancel = document.getElementById('button-cancel');
    this.formError = document.querySelector('#form-error');
    this.addProduct = document.getElementById('add-product');
  }

  showPopup() {
    this.popupBlock.classList.remove('hidden');
    this.popupBlock.style.top = `${(window.innerHeight - this.popupBlock.offsetHeight) / 2}px`;
    this.popupBlock.style.left = `${(window.innerWidth - this.popupBlock.offsetWidth) / 2}px`;
  }

  eventsPopup() {
    // save the data
    this.buttonSave.addEventListener('click', () => {
      if (this.inputName.value === '') {
        this.inputName.classList.add('invalid');
        this.showError(this.inputName, 'Введите название товара');
        return;
      }

      if (this.inputName.value !== '') {
        this.inputName.classList.remove('invalid');
      }

      const number = Number(this.inputPrice.value);
      if (number <= 0) {
        this.inputPrice.classList.add('invalid');
        this.showError(this.inputPrice, 'Введите стоимость больше нуля');
        return;
      }

      this.popupBlock.classList.add('hidden');
      this.savedProduct();
      this.clearInput();
    });

    // cancel the input
    this.buttonCancel.addEventListener('click', () => {
      this.popupBlock.classList.add('hidden');
      this.hidenError();
      this.clearInput();
    });

    // close the popup
    this.closePopup.addEventListener('click', () => {
      this.popupBlock.classList.add('hidden');
    });

    // input the name
    this.inputName.addEventListener('input', () => {
      this.hidenError();
    });

    // input the price
    this.inputPrice.addEventListener('input', () => {
      this.hidenError();
    });
  }

  hidenError() {
    if (!this.formError.classList.contains('hidden')) {
      this.formError.classList.add('hidden');
    }
  }

  clearInput() {
    this.inputName.value = '';
    this.inputPrice.value = '';
  }

  showError(element, message) {
    this.formError.textContent = message;
    this.formError.classList.remove('hidden');
    this.formError.style.top = `${element.offsetTop + element.offsetHeight}px`;
    this.formError.style.left = `${element.offsetLeft + (element.offsetWidth - this.formError.offsetWidth) / 2}px`;
  }
}