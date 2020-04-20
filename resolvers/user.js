const bcrypt = require('bcryptjs')
const { createUser } = require('../models/user.js')

const userResolver = {
	createUser: async (args) => {
		try {
			const password = bcrypt.hash(args.userInput.password, 12)
			args.userInput.password = password
			return createUser(args.userInput)
		} catch(error) {
			throw err
		}
	}
}

module.exports = { userResolver }
