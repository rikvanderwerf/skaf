import { AuthenticationError, ApolloError } from "apollo-server-core"

export const resolverConfig = (permission, factory, resolver) => async (parent, args, context, info) => {
    const factoryObject = await factory(args.id || null, args, context)
    const model = await factoryObject.model
    if (!model && args.id) {
        throw new ApolloError("Not found")
    }
    
    // So the caller does not have to reach deep.
    context.model = model

    if (factoryObject.hasPermission(context.user, permission)) {
        return resolver(parent, args, context, info)   
    }

    throw new AuthenticationError('Unauthorized')
}