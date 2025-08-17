# API de Usuários - Desafio01

Esta API permite cadastro, login, consulta e remoção de usuários, utilizando banco de dados em memória. Ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express swagger-jsdoc
   ```

## Uso

- Para iniciar o servidor:
  ```bash
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register` - Cadastro de usuário
- `POST /login` - Login de usuário
- `GET /user/:username` - Consulta usuário
- `DELETE /user/:username` - Remove usuário

## Regras de Negócio

1. Não permite cadastro de usuários duplicados.
2. Login exige usuário e senha.
3. Só é possível deletar usuários existentes.
4. Consulta retorna dados do cadastro.

## Estrutura do Projeto

- `controller/` - Rotas e controle das requisições
- `service/` - Regras de negócio
- `model/` - Estrutura dos dados em memória
- `app.js` - Configuração do Express e Swagger
- `server.js` - Inicialização do servidor

## Testes

Para testar a API com Supertest, importe o `app.js` diretamente sem executar o método `listen()`.

---

API desenvolvida para fins educacionais.
