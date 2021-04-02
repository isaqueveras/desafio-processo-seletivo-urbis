var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const config = require("../config/Authentication");
const db = require("../models");
const Op = db.Sequelize.Op;

const User = db.user;

exports.create = (req, res) => {
  // Validando a requição
  if (!req.body.name && !req.body.email && !req.body.password) {
    res.status(400).send({ message: "Os campos não podem ser vazios!" });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  // Salva no banco de dados o usuário
  User.create(user).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.message || "Desculpe, ocorreu um error enquanto criava o usuário" });
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Senha invalida!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 horas
    });

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    });
  
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({
    where: condition,
    attributes: ['id', 'name', 'email'],
    order: [
      ['createdAt', 'DESC']
    ],
    include: {
      association: 'tasks', 
      attributes: ['id', 'title', 'priority', 'isConcluded'],
    }
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: "Ocorreu um erro enquanto listava os usuários" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  
  User.update(user, {
    where: { id: id }
  }).then(num => {
    if (num == 1) res.send({ message: "Usuário foi editado com sucesso!" });
    else res.send({ message: "Não foi possível editar o usuário." });
  }).catch(err => {
    res.status(500).send({ message: "Desculpe, mas este usuário não existe!" });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) res.send({ message: "O usuário foi excluído com sucesso!" });
    else res.send({ message: "Não foi possivel excluir a usuário, tente novamente!" });
  }).catch(err => {
    res.status(500).send({ message: "Esta usuário não existe!" });
  });
};

exports.deleteAll = (req, res) => {
  User.destroy({ where: {} }).then(nums => {
    res.send({ message: `${nums} usuários foram excluídos com sucesso!` });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Não foi possivel excluir as usuários, tente novamente!" });
  });
};
