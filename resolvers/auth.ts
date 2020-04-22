const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

export const authResolver = {
	Query: {
		async login(_, args, context) {
			try {
				const user = await context.models.user.get({
					"email": args.authInput.email
				}) 
				const passwordIsCorrect = await bcrypt.compare(args.authInput.password, user.password)
				if (!passwordIsCorrect) {
					throw new Error('Invalid credentials')
				}
				const token = jwt.sign(
					{userId: user.id, email: user.email},
					'privateKey',
					{ expiresIn: '100000h'}
				)
				return {
					userId: user.id, 
					token: token,
				}
			} catch(error) {
				throw error
			}
		}
	}	
}