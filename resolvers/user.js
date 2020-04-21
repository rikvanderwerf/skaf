const bcrypt = require('bcryptjs')
const { createUser } = require('../models/user.js')

const userResolver = {
	Mutation: {
		async createUser(parent, args, context, info) {
			try {
				const password = await bcrypt.hash(args.userInput.password, 12)
				args.userInput.password = password
				return createUser(args.userInput)
			} catch(error) {
				throw err
			}
		}
	}
}

exports.userResolver = userResolver
