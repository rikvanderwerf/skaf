const user = require('../models/user.js')
const { handleDataBaseQueryPromise } = require('./resolver.js')

const authResolver = {
	rootQuery: {
		login: (_, args) => {
			return []
		}
	}
}

module.exports = { authResolver }
