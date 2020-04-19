const jwt = require('jsonwebtoken')

function setAuthenticatedToFalse(request, next) {
    request.isAuthenticated = false
    return next()
}

module.exports = (request, response, next) => {
    const authHeader = request.get('Authorization')
    if (!authHeader) {
        return setAuthenticatedToFalse(request, next)
    }
    const token = authHeader.split(' ')[1]
    if (!token || token == '') {
        return setAuthenticatedToFalse(request, next)
    }
    let decodedToken
    try {
        decodedToken = jwt.token(token, 'privateKey')
    } catch (error) {
        return setAuthenticatedToFalse(request, next)
    }
    request.isAuthenticated = true
    request.userId = decodedToken.userId
    next()
  }
 jwt 