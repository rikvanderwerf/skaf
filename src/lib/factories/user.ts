import { acl } from "./factories"
import { getUser } from "../../models/user"

export const userFactory = (id) => {
    const _acl = {
        'everyone': ['user.create']
    }

    const model = getUser(id)

    const self = {
        _acl,
        model
    }
    
    return Object.assign(self, acl(self))
}