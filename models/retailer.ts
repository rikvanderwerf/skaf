import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'

export class Retailer extends Model {
	public id!: string 
	public name!: string
	public userCreatedId!: string
}

Retailer.init({
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	userCreatedId: {
		type: DataTypes.UUID,
		allowNull: false,
		field: "user_created_id",
		// referenceses: 'user',
		// referencesKey: 'id'
	}
}, {
	sequelize: sequelize
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
		retailerInput.userCreatedId = user.id
		return createRetailer(retailerInput)
	},
	get: (retailerInput) => {
		return getRetailer(retailerInput)
	},
	list: (retailerInput) => {
		return listRetailers(retailerInput)
	},
})