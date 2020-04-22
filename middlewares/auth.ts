const { getUser } = require('../models/user.js')
const jwt = require('jsonwebtoken')

export async function getUserFromRequestIfLoggedIn(request) {
    const authHeader = request.get('Authorization')
    if (!authHeader) {
        return 
    }
    const token = authHeader.split(' ')[1]
    if (!token || token == '') {
        return 
    }
    let decodedToken
    try {
        decodedToken = jwt.decode(token, 'privateKey')   
    } catch (error) {
        return 
    }
    return await getUser({'id': decodedToken.userId})
}