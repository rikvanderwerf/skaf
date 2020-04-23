import { AuthenticationError } from "apollo-server-core"
import { factories } from "./factories/factories"


export const resolverConfig = (permission, resolver) => (parent, args, context, info) => {
    console.log(context.factories[0].hasPermission)
    for (const factoryIndex in context.factories) {
        
        if (context.factories[factoryIndex].hasPermission(permission)) {
            return resolver(parent, args, context, info)   
        }
    }
    throw new AuthenticationError('Unauthorized')
    
}