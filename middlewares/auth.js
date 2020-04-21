const { findUser } = require('../models/user.js')
const jwt = require('jsonwebtoken')

function getUserFromRequestIfLoggedIn(request) {
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
        decodedToken = jwt.token(token, 'privateKey')
    } catch (error) {
        return 
    }
    return findUser(decodedToken.userId)
}

exports.addUserToRequestIfLoggedIn = getUserFromRequestIfLoggedIn