const { getCatalog, createCatalog } = require('../models/catalog.js')
const { NotFoundError } = require('../lib/errors.js')

const catalogResolver = {
    Query: {
        catalog: async (parent, args, context, info) => {
            catalog = await getCatalog(args.catalogInput)
            if (!catalog) { throw NotFoundError }
            return catalog
        }
    },
    Mutation: {
        createCatalog: async(parent, args, context, info) => {
            return await createCatalog(args.catalogInput)
        }
    }
}

exports.catalogResolver = catalogResolver