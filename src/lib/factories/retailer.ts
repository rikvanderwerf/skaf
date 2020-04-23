import { User } from "../../models/user"
import { containsAcl } from "./factories"

export const retailerFactory = () => {
    const _acl = {
        'everyone': ['retailers.get', 'retailers.list'], 
        'authenticated': ['retailers.post'] 
     }
    const self = {
        _acl
    }
    return Object.assign(self, containsAcl(self))
}


