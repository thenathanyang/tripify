const users = {}

const getID = () => (''+Math.random()).split('.')[1];

exports.getUsers = () =>
  Object.keys(users).map(id => users[id]);

exports.getUser = id => users[id];

exports.getUserByEmail = email =>
  users[Object.keys(users).find(id => users[id].email === email)];

exports.createUser = (name, email, id = getID()) =>
  users[id] = {name, email, id};
