const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const sinon = require('sinon');
const { users } = require('../../model/userModel'); 
const userService = require('../../service/userService'); 

describe('User Cntroller', () => {
  afterEach(() => {
        sinon.restore();
    });
   
    describe('POST /register', () => {
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
        const fakeUser = {
          username: 'Priscila',
          password: '1234567',
          name: 'Priscila A',
          email: 'priscila@gmail.com',
        };
        
        sinon.stub(userService, 'registerUser').returns({ error: 'Usuário já existe' });

        const resposta = await request(app)
          .post('/register')
          .send(fakeUser);
        
        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Usuário já existe');
      });

      it('Quando faço o login com dados inválidos recebo 400', async () => {
        const fakerUserNotExist = {
          username: 'Jose',
          password: '1234567',
          name: 'JoseS',
          email: 'joses@gmail.com',
        };
        
        sinon.stub(userService, 'loginUser').returns({ error: 'Credenciais inválidas' }); 

        const resposta = await request(app)
          .post('/login')
          .send(fakerUserNotExist);
        expect(resposta.status).to.equal(400);       
        expect(resposta.body).to.have.property('error', 'Credenciais inválidas');
      
    });
    
    describe('GET /user/:username', () => {
        afterEach(() => {
        sinon.restore();
        });

      it('Quando consulto um usuário não cadastrado recebo 404', async () => {
        const fakerUserNotExist = {
          username: 'Jose',
          password: '1234567',
          name: 'JoseS',
          email: 'joses@gmail.com',
        };

        sinon.stub(userService, 'getUser').returns({ error: 'Usuário não encontrado' });

        const resposta = await request(app)
          .get(`/user/${fakerUserNotExist.username}`);

        expect(resposta.status).to.equal(404);
        expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
      });

      it('Quando consulto um usuário cadastrado, recebo 200 e os dados do usuário', async () => {
        const fakeUser = {
          username: 'Priscila',
          password: '1234567',
          name: 'Priscila A',
          email: 'priscila@gmail.com',
        };

        sinon.stub(userService, 'getUser').returns({ user: fakeUser });

        const resposta = await request(app).get(`/user/${fakeUser.username}`);
        expect(resposta.status).to.equal(200);
        expect(resposta.body).to.not.have.property('error');
        expect(resposta.body).to.have.property('username', fakeUser.username);
      });
    });
  });
});