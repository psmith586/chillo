const Sequelize = require('sequelize');

module.exports = sequelize.define("listing", {
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
    type: Sequelize.STRING(500)
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
    type: Sequelize.DECIMAL(9,1),
  }, 
  latitude: {
    type: Sequelize.STRING(45)
  }, 
  longitude: {
    type: Sequelize.STRING(45)
  }, 
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});