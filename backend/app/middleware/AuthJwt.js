require('dotenv').config();
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Nenhum token fornecido!" });
  }

  jwt.verify(token, process.env.TOKEN_KEY_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Você não tem autorização!" });
    }

    req.user_id = decoded.id;
    next();
  });

};

isUser = (req, res, next) => {
  User.findByPk(req.user_id).then(user => {
    if (user.id) {
      next();
      return;
    }

    res.status(403).send({ message: "Faça login para ter acesso a esse conteudo!" });
  }).catch(err => {
    res.status(500).send({ message: "Você não tem autorização!" });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser
};

module.exports = authJwt;