const express = require('express');
const router = express.Router();
const userService = require('../service/userService');


router.post('/register', (req, res) => {
  const result = userService.registerUser(req.body);
  if (result.error) return res.status(400).json(result);
  res.json(result.user);
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 *       400:
 *         description: Credenciais inválidas
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
  const result = userService.loginUser(username, password);
  if (result.error) return res.status(400).json(result);
  res.json(result.user);
});

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Consulta usuário
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:username', (req, res) => {
  const result = userService.getUser(req.params.username);
  if (result.error) return res.status(404).json(result);
  res.json(result.user);
});

/**
 * @swagger
 * /user/{username}:
 *   delete:
 *     summary: Remove usuário
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/user/:username', (req, res) => {
  const result = userService.deleteUser(req.params.username);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

module.exports = router;
