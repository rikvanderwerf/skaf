const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const authResolver = {
	Query: {
		async login(parent, args, context, info) {
			try {
				console.log("*(**************************")
				const user = await User.findUser({
					"email": args.authInput.email
				}) 
				console.log("*(**************************")
				const passwordIsCorrect = await bcrypt.compare(args.authInput.password, user.password)
				if (!passwordIsCorrect) {
					throw new Error('Invalid credentials')
				}
				const token = jwt.sign(
					{userId: user.id, email: user.email},
					'privateKey',
					{ expiresIn: '1h'}
				)
				return {
					userId: user.id, 
					token: token,
				}
			} catch(error) {
				console.log("23123-")
				throw err
			}
		}
	}	
}

module.exports = { authResolver }
