import bcrypt from 'bcryptjs'
import { resolverConfig } from '../lib/authorization'
import { userFactory } from '../lib/factories/user'

export const userResolver = {
	Mutation: {
		createUser: resolverConfig('user.create', userFactory , async (_, args, context) => {
			try {
				const password = await bcrypt.hash(args.userInput.password, 12)
				args.userInput.password = password
				return context.models.user.create(args.userInput)
			} catch(error) {
				throw error
			}
		})
	}
}