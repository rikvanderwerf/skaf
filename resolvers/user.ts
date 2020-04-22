const bcrypt = require('bcryptjs')

export const userResolver = {
	Mutation: {
		async createUser(_, args, context) {
			try {
				const password = await bcrypt.hash(args.userInput.password, 12)
				args.userInput.password = password
				return context.models.user.create(args.userInput)
			} catch(error) {
				throw error 
			}
		}
	}
}