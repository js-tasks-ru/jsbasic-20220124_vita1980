function hideSelf() {
  let hide = function () {
    this.hidden = true;
  }
  let button = document.getElementsByClassName("hide-self-button")[0];
  button.addEventListener("click", hide);
}


