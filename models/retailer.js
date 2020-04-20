const { Model, DataTypes} = require('sequelize');

const { sequelize } = require('../database/database.js');

var Retailer = sequelize.define('retailer', {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		}, 	
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},

	})

function list(retailerInput) {
	return Retailer.findAll({
		where: {
			name: retailerInput.name
		}
	})
}

function create(args) {
    return Retailer.create(args)	
}

module.exports = { list, create }
