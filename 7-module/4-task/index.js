import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem;
  #steps;
  #value;
  #thumb;
  #progress;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#elem = this.makeDom();
    this.#thumb = this.#elem.querySelector('.slider__thumb');
    this.#progress = this.#elem.querySelector('.slider__progress');
    this.addListeners();
  }

  get elem() {
    return this.#elem;
  }

  get value() {
    return this.#value;
  }

  getUserEvent = () => new CustomEvent('slider-change', {
    detail: this.value, // значение 0, 1, 2, 3, 4
    bubbles: true
  })

  render() {
    let str = `<!--Корневой элемент слайдера-->
    <div class="slider">
    
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
    
      <!--Полоска слайдера-->
      <div class="slider__progress"></div>
    
      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
        <!-- текущий выбранный шаг выделен этим классом -->`
    for (let i = 0; i < this.#steps; i++) {
      if (i == this.#value)
        str = str + `<span class="slider__step-active"></span></span>`;
      else
        str = str + `<span></span>`;
    }
    str = str + `</div>
    </div>`;
    return str;
  }

  makeDom() {
    const dom = createElement(this.render());
    const thumb = dom.querySelector('.slider__thumb');
    const progress = dom.querySelector('.slider__progress');
    const segments = this.#steps - 1;
    const valuePercents = this.#value / segments * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    return dom;
  }

  addListeners() {
    const dom = this.#elem;

    dom.addEventListener('click', (event) => {
      const segments = this.#steps - 1;
      const left = event.clientX - dom.getBoundingClientRect().left;
      const leftRelative = left / dom.offsetWidth;
      const approximateValue = leftRelative * segments;
      const value = Math.round(approximateValue);
      const valuePercents = value / segments * 100;
      this.#thumb.style.left = `${valuePercents}%`;
      this.#progress.style.width = `${valuePercents}%`;
      dom.querySelector('.slider__value').textContent = `${value}`;
      dom.querySelector('.slider__step-active').classList.remove('slider__step-active');
      dom.querySelectorAll('span')[value + 1].classList.add('slider__step-active');
      this.#value = value;
      dom.dispatchEvent(this.getUserEvent());
    });

    this.#thumb.onpointerdown = function (event) {
      event.preventDefault();
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPnointerUp);
      dom.classList.add('slider_dragging');
    }

    this.#thumb.ondragstart = function () {
      return false;
    };
  }

  onPointerMove = (event) => {
    const dom = this.#elem;
    const left = event.clientX - dom.getBoundingClientRect().left;
    const leftRelative = left / this.#elem.offsetWidth;
    // курсор вышел из слайдера => оставить бегунок в его границах.
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    const leftPercents = leftRelative * 100;
    const segments = this.#steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);
    dom.querySelector('.slider__value').textContent = `${value}`;
    dom.querySelector('.slider__step-active').classList.remove('slider__step-active');
    dom.querySelectorAll('span')[value + 1].classList.add('slider__step-active');

    this.#thumb.style.left = `${leftPercents}%`;
    this.#progress.style.width = `${leftPercents}%`;
    this.#value = value;
    dom.dispatchEvent(this.getUserEvent());
  }

  onPointerUp = () => {
    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.#elem.classList.remove('slider_dragging');
  }
}
