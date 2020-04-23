import { retailerFactory } from "./retailer";
import { User } from "../../models/user";

export const containsAcl = (self) => ({
    hasPermission: (user: User, permission: String) => {
        let allAcl = []
        allAcl = allAcl.concat(self._acl['everyone'])
        if (user) {
            allAcl = allAcl.concat(self._acl['user:${user.id}'])
            allAcl = allAcl.concat(self._acl['authenticated'])
        }
        return allAcl.includes(permission)
    }
})

export const factories = [
    retailerFactory()
]