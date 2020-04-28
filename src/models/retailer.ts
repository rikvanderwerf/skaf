import { DataTypes, Model } from 'sequelize'
import { Store } from './store'
import { User } from './user'

export class Retailer extends Model {
	public id!: string 
	public name!: string
	public userCreatedId!: string

	static init(sequelize, DataTypes) {
        return super.init.call(this, {
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
			}
		}, {
			sequelize: sequelize
		})
    }

    static associate(models) {
		console.log("*******")
		// this.hasMany(models.Store, {
		// 	foreignKey: 'retailer_id',
		// 	as: 'store'
		// })
    }

	_acl = () => {
		const user = `user:${this.userCreatedId}`
        return {
            user : ['retailer.put']
        }
    }

	acl = this._acl()
}

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
	}
})

