const { DataTypes } = require('sequelize');
const { Retailer } = require('./retailer.js')
const { sequelize } = require('../database/database.js');

const User = sequelize.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
	}, 	
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true, 
		required: true, 
		validate: {
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		required: true, 
		validate: {
			min: 8
		}
	}
}, {underscored: true})

User.hasMany(Retailer, {as: "Retailers"})

function createUser(userInput) {
	return User.create(userInput)	
}

function listUsers(userInput) {
	return User.find({
		where: userInput
	})	
}

function getUser(userInput1) {
	return User.findOne({
		where: userInput 
	})
}

const generateUserModel = ({ user }) => ({
	list: (userInput) => {
		listUsers(userInput) 
	},
	get: (userInput) => { 
		getUser(userInput) 
	},
	create: (userInput) => { 
		createUser(userInput) 
	}
});

exports.User = User
exports.generateUserModel = generateUserModel
