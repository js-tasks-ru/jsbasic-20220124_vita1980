import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #title;
  #body;

  constructor() {
    this.modal = createElement(this.render());
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }

  setBody(body) {
    this.modal.querySelector('.modal__body').innerHTML = '';
    this.modal.querySelector('.modal__body').append(body);
  }

  #onClose = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  open() {
    if (this.#body instanceof Node) {
      this.modal.querySelector('.modal__body').appendChild(this.#body);
    }

    document.body.appendChild(this.modal);
    document.body.classList.add('is-modal-open');
    this.modal.querySelector('.modal__close').addEventListener('click', () => this.close());
    document.body.addEventListener('keydown', this.#onClose);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.body.removeEventListener('keydown', this.#onClose);
  }

  render() {
    return `
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          ${this.#title}
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>
  </div>
`;
  }
}
