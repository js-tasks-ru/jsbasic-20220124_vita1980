function factorial(n) {
  if (n === 0) return 1;
  else {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact = fact * i;
    }
    return fact;
  }
}
