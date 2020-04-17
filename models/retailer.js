const { Model, DataTypes} = require('sequelize');

const { sequelize } = require('../database/database.js')

const Retailer = sequelize.define('retailer', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
	}, 	
	name: {
		type: DataTypes.STRING,
		allowNull: false
 	}
})

function listRetailers() {
	return Retailer.findAll()
}

module.export = { Retailer, listRetailers } 
