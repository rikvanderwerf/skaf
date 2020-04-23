import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'
import { Store } from './store'
import { User } from './user'

export class Retailer extends Model {
	public id!: string 
	public name!: string
	public userCreatedId!: string

	acl = {
		'user:${userCreatedId}': ['retailers.put']
	}
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
		// references: {
		// 	model: User,
		// 	key: 'id'
		// }
	}
}, {
	sequelize: sequelize
})

const Shops = Retailer.hasMany(Store, {
	foreignKey: 'retailer_id',
		as: 'shops'
	}
)

function createRetailer(retailerInput) {
    return Retailer.create(retailerInput)
}

export function getRetailer(id) {
	return Retailer.findOne({
		where:{
			id: id
		}
	})
}

function listRetailers(retailerInput) {
	return Retailer.findAll({
		where: retailerInput
	})
}

function putRetailer(id, retailerInput) {
	return Retailer.update(
		retailerInput, 	
		{
			where: {
				id: id
			},
			returning: true
		}
	  ).then(([_, updatedRetailer]) => {
		  return updatedRetailer
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
	put: async (id, retailerInput) => {
		const updatedList = await putRetailer(id, retailerInput)
		return updatedList[0]
	},
})

