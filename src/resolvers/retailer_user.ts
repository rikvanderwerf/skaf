import { resolverConfig } from '../lib/authorization'
import { retailerUserFactory } from '../lib/factories/retailer_user'

export const retailerUserResolver = {
    Mutation: {
        createRetailerUser: resolverConfig('retailerUser.post', retailerUserFactory, async (_, args, context) => {
            return context.models.retailerUser.create(args.retailerUserInput)
        })
    }
}