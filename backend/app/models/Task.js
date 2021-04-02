module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    priority: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    id_user: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    isConcluded: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  });

  return Task;
};
