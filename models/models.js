const { generateCatalogModel } = require('./catalog.js')
const { generateUserModel } = require('./user.js')

const generateModels = (user) => {
    return {
        user: generateUserModel(user),
        catalog: generateCatalogModel(user)
    }
}

exports.generateModels = generateModels