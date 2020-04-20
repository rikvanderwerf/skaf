const { Country } = require('./country.js')
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/database.js');

const City = sequelize.define('city', {
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

City.hasOne(Country, {
    foreignKey: "country_id"
})

exports.City = City