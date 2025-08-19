const express = require('express');
const router = express.Router();
const userService = require('../service/userService');


router.post('/register', (req, res) => {
  const result = userService.registerUser(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result.user);
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
  const result = userService.loginUser(username, password);
  if (result.error) return res.status(400).json(result);
  res.json(result.user);
});


router.get('/user/:username', (req, res) => {
  const result = userService.getUser(req.params.username);
  if (result.error) return res.status(404).json(result);
  res.json(result.user);
});

module.exports = router;
