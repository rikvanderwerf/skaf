const { Model, DataTypes} = require('sequelize');

const { sequelize } = require('../database/database.js');

// const listRetailers = function() {
// 	return Retailer.findAll()
// }

// const createRetailer = (args) => {
// 	Retailer.create(args)	
// }

module.export = (sequelize, DataTypes) => {
	var User = sequelize.define('user', {
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
	return User
}
