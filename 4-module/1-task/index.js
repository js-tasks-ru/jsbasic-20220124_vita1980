function makeFriendsList(friends) {
  const list = document.createElement('ul');
  const li = [];
  for (let i = 0; i < friends.length; i++) {
    li[i] = document.createElement('li');
    li[i].textContent = friends[i].firstName + ' ' + friends[i].lastName;
    list.append(li[i]);
  }
  return list;
}
