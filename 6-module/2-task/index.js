import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  #elem;
  product;
  constructor(product) {
    this.product = product;
    this.#elem = this.makeDOM(product);
  }

  get elem() {
    return this.#elem;
  }

  makeHTML(product) {
    let str = `      
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/`
      + product.image + `" class="card__image" alt="` + `/assets/images/products/` + product.image + `">
        <span class="card__price">€`+ product.price.toFixed(2) +
      `</span>
    </div>
    <div class="card__body">
      <div class="card__title">`+ product.name +
      `</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
  </div>`;
    return str;
  }

  makeDOM(product) {
    let dom = createElement(this.makeHTML(product));
    let but = dom.querySelector(".card__button");
    but.addEventListener('click', () => this.makeEvent());
    return dom;
  }

  makeEvent() {
    let event = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true,
    });
    this.#elem.dispatchEvent(event);
  }
}

