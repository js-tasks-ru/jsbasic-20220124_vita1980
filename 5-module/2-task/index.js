function toggleText() {
  // ваш код...
  document.querySelector('.toggle-text-button').onclick = function () {
    text = document.getElementById('text');
    if (text.hidden == true)
      text.hidden = false;
    else
      text.hidden = true;
  }
}
