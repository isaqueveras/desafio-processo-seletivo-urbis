const db = require("../models");
const User = db.users;

checkDuplicateEmail = (req, res, next) => {
  // E-mail
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Error! Já existe um email igual o seu."
      });
      return;
    }
    next();
  });

};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;
