import bcrypt from 'bcryptjs'
import { getUser } from '../models/user'
import jwt from 'jsonwebtoken'

export const authResolver = {
	Query: {
		async login(_, args, context) {
			try {
				
				const user = await getUser({
					"email": args.authInput.email
				})
				
				if (!user) { 
					throw new Error('Invalid credentials')
				}
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
					token,
				}
			} catch(error) {
				throw error
			}
		}
	}
}