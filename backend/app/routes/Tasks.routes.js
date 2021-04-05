const { authJwt } = require("../middleware");

module.exports = app => {
  const task = require("../controllers/TaskController");
  var router = require("express").Router();
  
  router.post('/', [authJwt.verifyToken, authJwt.isUser], task.create); // Cadastrar uma tarefa
  router.get('/:id', [authJwt.verifyToken, authJwt.isUser], task.findAll);  // Listar todas as tarefas
  router.get('/list/:id', [authJwt.verifyToken, authJwt.isUser], task.findOne);  // Listar dados da tarefa
  router.put('/:id', [authJwt.verifyToken, authJwt.isUser], task.update); // Editar uma tarefa
  router.delete('/:id', [authJwt.verifyToken, authJwt.isUser], task.delete); // Excluir uma tarefa
  router.delete('/delete/all', [authJwt.verifyToken, authJwt.isUser], task.deleteAll); // Excluir todas as tarefas

  app.use('/api/task', router);
};
