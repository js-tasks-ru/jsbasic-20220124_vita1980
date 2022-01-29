function checkSpam(str) {
  text = str.toLowerCase();
  let spam1 = text.includes('1xbet');
  let spam2 = text.includes('xxxxx');
  return spam1 || spam2;
}
