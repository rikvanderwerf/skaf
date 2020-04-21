const catalogResolver = {
    Query: {
        async catalog(_, args, context) {
            return await context.models.catalog.get(args.catalogInput)
        }
    },
    Mutation: {
        async createCatalog(_, args, context) {
            return await context.models.catalog.create(args.catalogInput)
        }
    }
}

exports.catalogResolver = catalogResolver