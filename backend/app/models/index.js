const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
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
