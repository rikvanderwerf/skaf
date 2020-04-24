import { DataTypes, Model } from 'sequelize'
import { Retailer } from './retailer'
import { sequelize } from '../database/database'

export class User extends Model {
	public id!: string
	public email!: string
	public password!: string
}

User.init({
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

User.hasMany(Retailer, {
	foreignKey: "user_created_id",
	as: "Retailers"
})

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

function listUsers(userInput) {
	return User.findAll({
		where: userInput
	})
}

export const generateUserModel = (user) => ({
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
