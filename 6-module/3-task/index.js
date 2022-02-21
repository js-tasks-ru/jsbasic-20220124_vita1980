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
      buttons[i].addEventListener('click', () => this.makeEvent(slides[i], buttons[i]));
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
    let slidesContainer = carousel.querySelector('.carousel__inner');
    let width = slidesContainer.querySelector('.carousel__img').width; // длина слайда

    let position = 0; // положение ленты прокрутки
    let currentSlide = 0; // номер текущего слайда
    let last = slidesContainer.querySelectorAll('.carousel__slide').length - 1; //номер последнего слайда
    let left = carousel.querySelector('.carousel__arrow.carousel__arrow_left');  //кнопка влево
    left.style.display = 'none';

    function inLeft() {
      // сдвиг влево
      position += width;
      if (currentSlide > 0) currentSlide -= 1;
      slidesContainer.style.transform = 'translateX(' + position + 'px)';
      if (currentSlide == 0) left.style.display = 'none';
      if (currentSlide < last) right.style.display = '';
    };

    left.addEventListener('click', inLeft);

    let right = carousel.querySelector('.carousel__arrow.carousel__arrow_right'); //кнопка вправо

    function inRight() {
      //сдевиг вправо
      position -= width;
      if (currentSlide < last) currentSlide += 1;
      slidesContainer.style.transform = 'translateX(' + position + 'px)';
      if (currentSlide > 0) left.style.display = '';
      if (currentSlide == last) right.style.display = 'none';
    };

    right.addEventListener('click', inRight);

  }
}
