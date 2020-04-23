import { AuthenticationError, ApolloError } from "apollo-server-core"

export const resolverConfig = (permission, factory, resolver) => async (parent, args, context, info) => {
    const factoryObject = factory(args.id)
    if (! await factoryObject.model && args.id) {
        throw new ApolloError("Not found")
    }
    
    if (factoryObject.hasPermission(context.user, permission)) {
        
        return resolver(parent, args, context, info)   
    }
    throw new AuthenticationError('Unauthorized')
}