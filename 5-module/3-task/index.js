function initCarousel() {

  carousel = document.querySelector('.carousel');

  let img = carousel.querySelector('.carousel__img');
  let width = img.width; // длина слайда
  let list = carousel.querySelector('.carousel__inner');

  let position = 0; // положение ленты прокрутки
  let count = 0; // номер текущего слайда
  let last = document.querySelectorAll('.carousel__slide').length; //номер последнего слайда
  let left = carousel.querySelector('.carousel__arrow.carousel__arrow_left');  //кнопка влево
  left.style.display = 'none';

  function inLeft() {
    // сдвиг влево
    position += width;
    if (count > 0) count -= 1;
    list.style.transform = 'translateX(' + position + 'px)';
    if (count == 0) left.style.display = 'none';
    if (count < 3) right.style.display = '';
  };

  left.addEventListener('click', inLeft);

  let right = carousel.querySelector('.carousel__arrow.carousel__arrow_right'); //кнопка вправо

  function inRight() {
    //сдевиг вправо
    position -= width;
    if (count < 3) count += 1;
    list.style.transform = 'translateX(' + position + 'px)';
    if (count > 0) left.style.display = '';
    if (count == 3) right.style.display = 'none';
  };

  right.addEventListener('click', inRight);

}
