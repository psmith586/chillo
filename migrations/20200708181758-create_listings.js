'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("listings", {
      listing_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      lister_uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      street_addr: {
        type: Sequelize.STRING(200)
      },
      city: {
        type: Sequelize.STRING(45)
      }, 
      zipcode: {
        type: Sequelize.INTEGER(11)
      }, 
      price: {
        type: Sequelize.INTEGER(50)
      }, 
      num_beds: {
        type: Sequelize.INTEGER(11)
      }, 
      num_baths: {
        type: Sequelize.INTEGER(11)
      }, 
      square_ft: {
        type: Sequelize.INTEGER(11)
      }, 
      parking: {
        type: Sequelize.INTEGER(11)
      }, 
      pets: {
        type: Sequelize.INTEGER(11)
      }, 
      description: {
        type: Sequelize.STRING(300)
      },
      approved: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      sell_rent: {
        type: Sequelize.STRING(3)
      },
      category: {
        type: Sequelize.INTEGER(11)
      },
      stories: {
        type: Sequelize.INTEGER(11)
      },
      distance: {
        type: Sequelize.INTEGER(11)
      },
      latitude: {
        type: Sequelize.FLOAT()
      },
      longitude: {
        type: Sequelize.FLOAT()
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("listings");
  }
};
