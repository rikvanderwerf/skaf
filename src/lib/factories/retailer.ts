import { User } from "../../models/user"

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

const containsAcl = (self) => ({
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


