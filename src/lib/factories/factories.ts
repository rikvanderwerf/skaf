import { User } from "../../models/user";

export const acl = (self) => ({
    hasPermission: async (user: User, permission: string) => {
        let allAcl: Array<string> = []
        allAcl = allAcl.concat(self._acl['everyone'] || [])
        if (user) {
            allAcl = allAcl.concat(self._acl[`user:${user.id}`] || [])
            allAcl = allAcl.concat(self._acl['authenticated'] || [])
        }

        const model = await self.model
        if (model) {
            allAcl = allAcl.concat(model.acl[`user:${user.id}`] || [])
        }
        console.log(allAcl)
        return allAcl.includes(permission)
    }
})