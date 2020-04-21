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

function createUser(args) {
	return User.create(args)	
}

function listUsers(args) {
	return User.find({
		where: userFields 
	})	
}

function findUser(userFields) {
	return User.findOne({
		where: userFields 
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
	},
});

exports.User = User
exports.generateUserModel = generateUserModel
