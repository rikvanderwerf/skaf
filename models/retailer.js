const { DataTypes} = require('sequelize');
const { sequelize } = require('../database/database.js');
const { User } = require('./user.js')

const Retailer = sequelize.define('retailer', {
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


function createRetailer(args) {
    return Retailer.create(args)	
}

function listRetailers(retailerInput) {
	return Retailer.findAll({
		where: retailerInput
	})
}


exports.createRetailer = createRetailer
exports.Retailer = Retailer
exports.listRetailers = listRetailers
