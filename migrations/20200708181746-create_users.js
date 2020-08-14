'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      uid: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      sfsu_verified: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      permission: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
