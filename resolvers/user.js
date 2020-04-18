const bcrypt = require('bcryptjs')
const user = require('../models/user.js')
const { handleDatabaseQueryPromise } = require('./resolver.js')

const userResolver = {
	rootMutation: {
		createUser: (_, args) => {
			return bcrypt.hash(args.userInput.password, 12)
				.then(password => {
					args.userInput.password = password
					return handleDatabaseQueryPromise(
						user.create(args.userInput)
					)
				})
				.catch(err => {
					throw err
				})
		}
	}
}

module.exports = { userResolver }
