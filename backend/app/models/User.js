module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
  });

  return User;
};
