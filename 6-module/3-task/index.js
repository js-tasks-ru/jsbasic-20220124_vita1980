import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }


  render() {

    this.carousel = createElement(
      `<div class="carousel">
				<div class="carousel__arrow carousel__arrow_right">
					<img src="/assets/images/icons/angle-icon.svg" alt="icon">
				</div>
				
				<div class="carousel__arrow carousel__arrow_left">
					<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
				</div>
				<div class="carousel__inner"></div>
			</div>`
    );

    this.carouselInner = this.carousel.querySelector('.carousel__inner');

    for (let i = 0; i < this.slides.length; i++) {
      this.carouselInner.insertAdjacentHTML('beforeEnd',
        `<div class="carousel__slide" data-id=${this.slides[i].id}>
					<img src="/assets/images/carousel/${this.slides[i].image}" class="carousel__img" alt="slide">
					<div class="carousel__caption">
						<span class="carousel__price">€${this.slides[i].price.toFixed(2)}</span>
						<div class="carousel__title">${this.slides[i].name}</div>
						<button type="button" class="carousel__button">
							<img src="/assets/images/icons/plus-icon.svg" alt="icon">
						</button>
					</div>
				</div>`);
    }

    this.buttons = this.carouselInner.querySelectorAll('.carousel__button');

    for (let btn of this.buttons) {
      btn.addEventListener('click', (event) => {

        let productAddEvent = new CustomEvent("product-add", {
          detail: event.target.closest('.carousel__slide').getAttribute('data-id'),
          bubbles: true
        });

        this.carousel.dispatchEvent(productAddEvent);
      });
    }

    this.btnRight = this.carousel.querySelector('.carousel__arrow_right');
    this.btnLeft = this.carousel.querySelector('.carousel__arrow_left');
    this.translateX = 0;
    this.btnLeft.style.display = 'none';


    this.btnRight.addEventListener("click", () => {
      this.carouselInnerWidth = this.carouselInner.offsetWidth;

      this.translateX -= this.carouselInnerWidth;
      this.carouselInner.style.transform = `translateX(${this.translateX}px)`;

      if (this.translateX < 0) {
        this.btnLeft.style.display = '';
      }

      if (this.translateX === -this.carouselInnerWidth * (this.slides.length - 1)) {
        this.btnRight.style.display = 'none';
      }
    });

    this.btnLeft.addEventListener("click", () => {
      this.carouselInnerWidth = this.carouselInner.offsetWidth;

      this.translateX += this.carouselInnerWidth;
      this.carouselInner.style.transform = `translateX(${this.translateX}px)`;

      if (this.translateX > -this.carouselInnerWidth * (this.slides.length - 1)) {
        this.btnRight.style.display = '';
      }

      if (this.translateX === 0) {
        this.btnLeft.style.display = 'none';
      }
    });

    return this.carousel;
  }
}