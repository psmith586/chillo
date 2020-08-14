const Sequelize = require('sequelize');

module.exports = sequelize.define("amenities", {
    amenity_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER(3),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});