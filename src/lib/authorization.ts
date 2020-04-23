import { AuthenticationError } from "apollo-server-core"
import { factories } from "./factories/factories"


export const resolverConfig = (permission, factory, resolver) => (parent, args, context, info) => {
    if (factory(args.id).hasPermission(context.user, permission)) {
        return resolver(parent, args, context, info)   
    }
    throw new AuthenticationError('Unauthorized')
}