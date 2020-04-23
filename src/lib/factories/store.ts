import { acl } from "./factories"
import { getStore } from "../../models/store"

export const storeFactory = (id) => {
    const _acl = {
        'everyone': ['store.get', 'store.list'], 
        'authenticated': ['store.post'] 
    }

    const model = getStore(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}