export const productTypeResolver = {
    Query: {
       async productTypes(_, args, context) {
            return await context.models.productType.list(args.productTypeInput) || []
        }
    }
}