const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const { users } = require('../../model/userModel');

describe('POST /register', () => {
  // Reset the users array before each test to ensure test isolation
  beforeEach(() => {
    users.length = 0;
  });

  it('Quando informo um novo usuário, o cadastro é realizado com sucesso e recebo 200', async () => {
    const userData = {
      username: 'NovoUsuario',
      password: 'senha',
      name: 'Novo Usuário',
      email: 'novo@email.com',
    };

    const resposta = await request(app)
      .post('/register')
      .send(userData);

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.not.have.property('error');
    expect(resposta.body).to.have.property('username', 'NovoUsuario');
  });

  it('Quando informo usuario já cadastrado recebo 400', async () => {
    const userData = {
      username: 'Priscila',
      password: '1234567',
      name: 'Priscila A',
      email: 'priscila@gmail.com',
    };

    // First, register the user. This should succeed.
    await request(app)
      .post('/register')
      .send(userData)
      .expect(200);

    // Then, try to register the same user again. This should fail.
    const resposta = await request(app).post('/register').send(userData);

    expect(resposta.status).to.equal(400);
    expect(resposta.body).to.have.property('error', 'Usuário já existe');
  });
});