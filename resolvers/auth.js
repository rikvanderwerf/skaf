const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

async function login(_, args) {
	try {
		const user = await User.findUser({
			"email": args.authInput.email
		}) 
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
		throw err
	}
}

const authResolver = {
	rootQuery: {
		login: login 	
	}
}

module.exports = { authResolver }
