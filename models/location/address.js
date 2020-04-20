const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/database.js');

const Address = sequelize.define('address', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4 
    },
    streetName: {
        type: DataTypes.STRING,
        required: false,
        allowNull: false,
        field: 'street_name'
    },
    postalCode: {
        type: DataTypes.STRING,
        required: false,
        allowNull: false,
        field: 'postal_code'
    },
    city: {
        type: DataTypes.STRING,
        required: false, 
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        required: false, 
        allowNull: false,
    }
})

exports.Address = Address
