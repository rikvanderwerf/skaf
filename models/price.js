const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/database.js')

const Price = sequelize.define('price', {
    id: {
        primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    currency: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    priceInCents: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        field: 'price_in_cents'
    }
})

exports.Price = Price