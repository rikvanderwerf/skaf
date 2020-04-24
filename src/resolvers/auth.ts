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
				console.log('search fo r user')
				console.log('user')
				if (!user) { 
					throw new Error('Invalid credentials')
				}
				const passwordIsCorrect = await bcrypt.compare(args.authInput.password, user.password)
				if (!passwordIsCorrect) {
					throw new Error('Invalid credentials')
				}
				console.log('19')
				const token = jwt.sign(
					{userId: user.id, email: user.email},
					'privateKey',
					{ expiresIn: '100000h'}
				)
				console.log("24")
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