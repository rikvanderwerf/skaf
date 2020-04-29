import { Model } from 'sequelize'
import { createPaginationObject } from '../lib/utils'

export class User extends Model {
	public id!: string
	public email!: string
	public password!: string

	static init(sequelize, DataTypes) {
		return super.init.call(this, {
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					min: 8
				}
			}
		}, {
			sequelize: sequelize,
			underscored: true
		})
	}

	static associate(models) {
		this.hasMany(models.Retailer, {
			foreignKey: "owner_id",
			as: "retailers"
		})
	}
}

function createUser(userInput) {
	return User.create(userInput)
}

export function getUserById(id) {
	return User.findOne({
		where: {
			id: id
		} 
	})
}

export function getUser(userInput) {
	return User.findOne({
		where: userInput
	})
}

function listUsers(paginationObject) {
	return User.findAll(paginationObject)
}

export const generateUserModel = () => ({
	create: (userInput) => {
		return createUser(userInput)
	},
	get: (userInput) => {
		return getUserById(userInput)
	},
	list: (userInput) => {
		return listUsers(userInput)
	},
})
