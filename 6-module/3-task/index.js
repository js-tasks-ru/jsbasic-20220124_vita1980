import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem;
  #slides;

  constructor(slides) {
    this.#slides = slides;
    this.#elem = this.makeDOM(slides);
    this.initCarousel(this.#elem);
  }

  get elem() {
    return this.#elem;
  }

  get slides() {
    return this.#slides;
  }

  makeHTML(slides) {
    let str = `<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">`;

    for (let slide of slides) {
      str = str +
        `<div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
        </div>`;
    }
    str = str + `</div></div>`;
    return str;
  }

  makeDOM(slides) {
    let dom = createElement(this.makeHTML(slides));
    let buttons = dom.querySelectorAll(".carousel__button");
    for (let i = 0; i < slides.length; i++) {
      buttons[i].addEventListener('click', (e) => this.makeEvent(slides[i], e.target));
    }
    return dom;
  }

  makeEvent(slide, button) {
    let event = new CustomEvent("product-add", {
      detail: slide.id,
      bubbles: true,
    });
    button.dispatchEvent(event);
  }

  initCarousel(carousel) {

  }
}
