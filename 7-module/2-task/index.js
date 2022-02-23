import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #title;
  #body;

  constructor() {
  }

  setTitle(title) {
    this.#title = title;
  }

  setBody(body) {
    this.#body = body;
  }

  #onClose = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  open() {
    const modal = createElement(this.render());

    if (this.#body instanceof Node) {
      modal.querySelector('.modal__body').appendChild(this.#body);
    }

    document.body.appendChild(modal);
    document.body.classList.add('is-modal-open');
    modal.querySelector('.modal__close').addEventListener('click', () => this.close());
    document.body.addEventListener('keydown', this.#onClose);
  }

  close() {
    document.body.querySelector('.modal').remove();
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
