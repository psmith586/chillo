'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("messages", {
      msg_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }, 
      sender_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      }, 
      recipient_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      listing_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      msg_text: {
        type: Sequelize.STRING(300)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("messages");
  }
};
