const Sequelize = require('sequelize');

module.exports = sequelize.define("photo", {
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