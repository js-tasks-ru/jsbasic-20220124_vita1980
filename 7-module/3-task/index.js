import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem;
  #steps;
  #value;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#elem = this.makeDom();
  }

  get elem() {
    return this.#elem;
  }
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
    let dom = createElement(this.render());
    let thumb = dom.querySelector('.slider__thumb');
    let progress = dom.querySelector('.slider__progress');
    let segments = this.#steps - 1;
    let valuePercents = this.#value / segments * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    dom.addEventListener('click', (event) => {
      let left = event.clientX - dom.getBoundingClientRect().left;
      let leftRelative = left / dom.offsetWidth;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      valuePercents = value / segments * 100;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      dom.querySelector('.slider__value').textContent = `${value}`;
      dom.querySelector('.slider__step-active').classList.remove('slider__step-active');
      dom.querySelectorAll('span')[value].classList.add('slider__step-active');
      // this.makeEvent();
      let userEvent = new CustomEvent('slider-change', {
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true
      })
      dom.dispatchEvent(userEvent);
    })
    return dom;

  }

  // makeEvent() {
  //   let userEvent = new CustomEvent('slider-change', {
  //     detail: this.#value, // значение 0, 1, 2, 3, 4
  //     bubbles: true
  //   })
  //   this.#elem.dispatchEvent(userEvent);
  // }

}
