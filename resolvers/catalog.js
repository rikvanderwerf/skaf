const { NotFoundError } = require('../lib/errors.js')

const catalogResolver = {
    Query: {
        async catalog(_, args, context) {
            catalog = await context.models.catalog.get(args.catalogInput)
            if (!catalog) { throw NotFoundError }
            return catalog
        }
    },
    Mutation: {
        async createCatalog(_, args, context) {
            return await context.models.catalog.create(args.catalogInput)
        }
    }
}

exports.catalogResolver = catalogResolver