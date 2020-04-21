const { getCatalog, createCatalog } = require('../models/catalog.js')
const { UnAuthenticatedError } = require('../lib/errors.js')
const { NotFoundError } = require('../lib/errors.js')

const catalogResolver = {
    catalog: async (args) => {
        catalog = await getCatalog(args.catalogInput)
        if (!catalog) { throw NotFoundError }
        return catalog
    },
    createCatalog: async(args) => {
        if (!request.isAuthenticated) {
			throw UnAuthenticatedError
		}
        return await createCatalog(args.catalogInput)
    }
}

exports.catalogResolver = catalogResolver