const db = require("../models");

const Task = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validando a requição
  if (!req.body.title && !req.body.priority && !req.body.id_user) {
    res.status(400).send({ message: "Os campos não podem ser vazios!" });
    return;
  }

  // Cria uma tarefa
  const task = {
    title: req.body.title,
    priority: req.body.priority,
    id_user: req.body.id_user,
    isConcluded: req.body.isConcluded,
  };

  // Salva no banco de dados a tarefa
  Task.create(task).then(data => {
    res.send({ message: "Tarefa cadastrada com sucesso" });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Ocorreu um erro enquanto cadastrava sua tarefa" });
  });
};

exports.findAll = (req, res) => {
  const { id } = req.params;

  Task.findAll({
    where: { id_user: id },
    attributes: ['id', 'title', 'priority', 'isConcluded'],
    order: [
      ['createdAt', 'DESC']
    ],
    include: {
      association: 'user', 
      attributes: ['id', 'name'],
    }
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Ocorreu um erro enquanto listava suas tarefa" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;

  const task = {
    title: req.body.title,
    priority: req.body.priority,
    id_user: req.body.id_user,
    isConcluded: req.body.isConcluded,
  };
  
  Task.update(task, {
    where: { id: id }
  }).then(num => {
    if (num == 1) res.send({ message: "Sua tarefa foi editado com sucesso!" });
    else res.send({ message: "Não foi possível editar sua tarefa." });
  }).catch(err => {
    res.status(500).send({ message: "Desculpe, mas esta tarefa não existe!" });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) res.send({ message: "A tarefa foi excluído com sucesso!" });
    else res.send({ message: "Não foi possivel excluir a tarefa, tente novamente!" });
  }).catch(err => {
    res.status(500).send({ message: "Esta tarefa não existe!" });
  });
};

exports.deleteAll = (req, res) => {
  Task.destroy({ where: {} }).then(nums => {
    res.send({ message: `${nums} tarefas foram excluídos com sucesso!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Não foi possivel excluir as tarefas, tente novamente!" });
  });
};
