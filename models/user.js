const { Model, DataTypes} = require('sequelize');

const { sequelize } = require('../database/database.js');

var User = sequelize.define('User', {
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
}, {underscored: true})

function createUser(args) {
	return User.create(args)	
}

function findUser(userFields) {
	return User.findOne({
		where: userFields 
	})
}

exports.User = User
exports.createUser = createUser
exports.findUser = findUser
