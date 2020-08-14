'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("photos", {
      idphotos: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }, 
      uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      }, 
      image_url: {
        type: Sequelize.STRING(200),
        allowNull: false
      }, 
      listing_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      main_photo: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("photos");
  }
};
