const { users } = require('../model/userModel');

function findUser(username) {
  return users.find(u => u.username === username);
}

function registerUser({ username, password, name, email }) {
  if (findUser(username)) return { error: 'Usuário já existe' };
  const user = { username, password, name, email };
  users.push(user);
  return { user };
}

function loginUser(username, password) {
  const user = findUser(username);
  if (!user || user.password !== password) return { error: 'Credenciais inválidas' };
  return { user };
}

function getUser(username) {
  const user = findUser(username);
  if (!user) return { error: 'Usuário não encontrado' };
  return { user };
}

module.exports = {
  registerUser,
  loginUser,
  getUser
};
