const Sequelize = require('sequelize');

module.exports = sequelize.define("message", {
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