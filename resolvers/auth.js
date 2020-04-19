const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const { handleDatabaseQueryPromise } = require('./resolver.js')

const authResolver = {
	rootQuery: {
		login: (_, args) => {
			return User.findUser({
				"email": args.authInput.email
			})
			.then(user => {
				return bcrypt.compare(args.authInput.password, user.password)
				.then(isPasswordCorrect => {
					if (isPasswordCorrect) {
						const token = jwt.sign({userId: user.id, email: user.email}, 'privateKey', {
							expiresIn: '1h'
						})
						return {
							userId: user.id, 
							token: token,
						}
					} else {
						throw new Error("Invalid credentials")
					}
				})	
			})
			.catch(err => {
				throw err 
			})
		}
	}
}

module.exports = { authResolver }
