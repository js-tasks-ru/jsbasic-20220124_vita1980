import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #elem;
  #categories;

  constructor(categories) {
    this.#categories = categories;
    this.#elem = this.makeDOM(categories);
    this.initScroll();
  }

  get elem() {
    return this.#elem;
  }

  get categories() {
    return this.#categories;
  }

  makeHTML(categories) {
    let str =
      `<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">`

    for (let cat of categories) {
      str = str +
        `<a href="#" class="ribbon__item" data-id="${cat.id}">${cat.name}</a>`
    }

    str = str +
      `</nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  </div>`
    return str;
  }

  initScroll() {
    let ribbonInner = this.#elem.querySelector('.ribbon__inner');
    let left = this.#elem.querySelector('.ribbon__arrow.ribbon__arrow_left');
    let right = this.#elem.querySelector('.ribbon__arrow.ribbon__arrow_right');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;

    left.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    right.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      if (scrollLeft == 0) {
        left.classList.remove('ribbon__arrow_visible');
        right.classList.add('ribbon__arrow_visible');
      }

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollRight < 1) {
        right.classList.remove('ribbon__arrow_visible');
        left.classList.add('ribbon__arrow_visible');
      }
    })

  }

  makeDOM(categories) {
    let dom = createElement(this.makeHTML(categories));
    dom.querySelector('a').classList.add('ribbon__item_active');
    let buttons = dom.querySelectorAll(".ribbon__item");
    for (let i = 0; i < categories.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        e.preventDefault();
        dom.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        e.target.classList.add('ribbon__item_active');
        this.makeEvent(categories[i], buttons[i])
      });
    }
    return dom;
  }

  makeEvent(cat, button) {
    let event = new CustomEvent('ribbon-select', {
      detail: cat.id,
      bubbles: true,
    })
    button.dispatchEvent(event);
  }
}
