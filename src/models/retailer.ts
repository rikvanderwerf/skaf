import { Model, HasManyGetAssociationsMixin } from 'sequelize'
import { RetailerUser } from './retailer_users'

export class Retailer extends Model {
	public id!: string 
	public name!: string

	public getRetailerUsers!: HasManyGetAssociationsMixin<RetailerUser>

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
			}
		}, {
				sequelize: sequelize
			})
		}

    static associate(models) {
		this.hasMany(models.Store, {
			foreignKey: 'retailer_id'
		})
		this.hasMany(models.RetailerUser, {
			foreignKey: 'retailer_id'
		})
    }

	_acl = async () => {
		const acl = {}
		const users = await this.getRetailerUsers()
		users.forEach(retailerUser => acl[`user:${retailerUser.userId}`] = ['retailer.put']) 
		
		return acl    
	}

	acl = this._acl()
}

function createRetailer(retailerInput) {
    return Retailer.create(retailerInput)
}

export function getRetailerById(id) {
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
		return getRetailerById(retailerInput.id)
	},
	list: (retailerInput) => {
		return listRetailers(retailerInput)
	}
})

