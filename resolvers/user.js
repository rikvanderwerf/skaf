const bcrypt = require('bcryptjs')
const user = require('../models/user.js')
const { handleDatabaseQueryPromise } = require('./resolver.js')

const userResolver = {
	createUser: async (args) => {
		try {
			const password = bcrypt.hash(args.userInput.password, 12)
			args.userInput.password = password
			return user.create(args.userInput)
		} catch(error) {
			throw err
		}
	}
}

module.exports = { userResolver }
