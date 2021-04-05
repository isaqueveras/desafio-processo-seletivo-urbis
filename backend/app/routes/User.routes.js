const { authJwt } = require("../middleware");

module.exports = app => {
  const user = require("../controllers/UserController");
  var router = require("express").Router();
  
  router.get('/', [authJwt.verifyToken, authJwt.isUser], user.findAll); // Listar os usuários
  router.post('/', checkDuplicateEmail, user.create); // Cadastrar usuário
  router.post('/signin', user.signIn); // Login do usuário
  router.put('/:id', [authJwt.verifyToken, authJwt.isUser], user.update); // Editar usuário
  router.delete('/:id', [authJwt.verifyToken, authJwt.isUser], user.delete); // Excluir uma usuário
  router.delete('/delete/all', [authJwt.verifyToken, authJwt.isUser], user.deleteAll); // Excluir todas os usuários

  app.use('/api/user', router);
};
