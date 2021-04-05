require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.task = require("./Task")(sequelize, Sequelize);
db.user = require("./User")(sequelize, Sequelize);

db.task.belongsTo(db.user, { 
  as: "user",  
  foreignKey: "id_user",
  onDelete: 'cascade'
});

db.user.hasMany(db.task, { 
  as: "tasks",  
  foreignKey: "id_user",
});

module.exports = db;
