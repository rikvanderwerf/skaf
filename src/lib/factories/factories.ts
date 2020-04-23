import { retailerFactory } from "./retailer";
import { User } from "../../models/user";
import { ApolloError } from "apollo-server-core";

export const containsAcl = (self) => ({
    hasPermission: async (user: User, permission: String) => {
        let allAcl = []
        allAcl = allAcl.concat(self._acl['everyone'])
        if (user) {
            allAcl = allAcl.concat(self._acl['user:${user.id}'])
            allAcl = allAcl.concat(self._acl['authenticated'])
            const model = await self.model
            if (model) {
                allAcl = allAcl.concat(model.acl['user:${userId.id}'])
            }
        }
        return allAcl.includes(permission)
    }
})

export const factories = [
    // retailerFactory()
]