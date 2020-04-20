const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/database.js');

const Country = sequelize.define('country', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    }
})


exports.Country = Country