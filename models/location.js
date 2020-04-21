const { Address } = require('./address.js')
const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/database.js')

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

const LocationAddress = Location.hasOne(Address, {
    foreignKey: 'address_id'
})

exports.Location = Location
exports.LocationAddress = LocationAddress
