const { DataTypes} = require('sequelize');
const { sequelize } = require('../database/database.js');

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

function createRetailer(retailerInput) {
    return Retailer.create(retailerInput)	
}

function getRetailer(retailerInput) {
	return Retailer.findOne({
		where: retailerInput
	})
}

function listRetailers(retailerInput) {
	return Retailer.findAll({
		where: retailerInput
	})
}

const generateRetailerModel = ({ user }) => ({ 
	create: (retailerInput) => { 
		createUser(retailerInput) 
	},
	get: (retailerInput) => { 
		getUser(retailerInput) 
	},
	list: (retailerInput) => {
		listUsers(retailerInput)
	},
})

exports.Retailer = Retailer
exports.generateRetailerModel = generateRetailerModel
