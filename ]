const user = require('../models/user.js')
const { handleDatabaseQueryPromise } = require('./resolver.js')

const userResolver = {
	rootMutation: {
		createUser: (_, args) => {
			return handleDatabaseQueryPromise(
				user.create(args.userInput)
			)
		}
	}
}

module.exports = { userResolver }
