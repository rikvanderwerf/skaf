const { Model, DataTypes} = require('sequelize');
const { sequelize } = require('../database/database.js');
const { User } = require('./user.js')

var Retailer = sequelize.define('retailer', {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		}, 	
		name: {
			type: DataTypes.STRING,
			required: true, 
			allowNull: false
		},
		// created_by_user_id: {
		// 	type: DataTypes.UUID,
		// 	allowNull: false,
		// 	required: true
		// }
	}, {underscored: true})

Retailer.belongsTo(User)

function listRetailers(retailerInput) {
	return Retailer.findAll({
		where: retailerInput
	})
}

function createRetailer(args) {
    return Retailer.create(args)	
}

exports.Retailer = Retailer
exports.listRetailers = listRetailers
exports.createRetailer = createRetailer
