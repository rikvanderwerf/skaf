const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database.js');

const Location = sequelize.define('location', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4 
    },
    latitude: {
        type: DataTypes.DECIMAL,
        required: false,
    },
    longitude: {
        type: DataTypes.DECIMAL,
        required: false, 
    }
})

exports.Location = Location
