function getMinMax(str) {
  let array = str.split(' ');
  let max = +array[0], min = +array[0];
  for (var i = 0; i < array.length; i++) {
    if (isFinite(array[i])) {
      if (max < +array[i]) max = +array[i];
      if (min > +array[i]) min = +array[i];
    }
  }
  return { min: min, max: max }
}