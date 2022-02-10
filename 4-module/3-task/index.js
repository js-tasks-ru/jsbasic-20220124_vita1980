function highlight(table) {

  for (let i = 1; i < table.rows.length; i++) {

    let av = table.rows[i].cells[3].getAttribute("data-available");
    if (av == "true")
      table.rows[i].classList.add("available");
    else
      if (av == "false")
        table.rows[i].classList.add("unavailable");
      else
        if (av === null)
          table.rows[i].setAttribute("hidden", "hidden");


    let ml = table.rows[i].cells[2].textContent;
    if (ml == 'm')
      table.rows[i].classList.add("male");
    else
      if (ml == 'f')
        table.rows[i].classList.add("female");

    let age = +table.rows[i].cells[1].textContent;
    if (age < 18)
      table.rows[i].style.textDecoration = "line-through";


  }
}
