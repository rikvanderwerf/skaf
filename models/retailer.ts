const { DataTypes} = require('sequelize');
const { sequelize } = require('../database/database.js');

export const Retailer = sequelize.define('retailer', {
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
	userCreatedId: {
		type: DataTypes.UUID,
		allowNull: false,
		required: true,
		field: "user_created_id",
		referenceses: 'user',
		referencesKey: 'id'
	}
})

// const acl = (retailer)

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

export const generateRetailerModel = (user) => ({ 
	create: (retailerInput) => { 
		retailerInput['userCreatedId'] = user.id
		return createRetailer(retailerInput) 
	},
	get: (retailerInput) => { 
		return getRetailer(retailerInput) 
	},
	list: (retailerInput) => {
		return listRetailers(retailerInput)
	},
})