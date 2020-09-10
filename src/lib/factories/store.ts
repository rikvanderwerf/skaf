import { acl } from "./factories"
import { getStoreById } from "../../models/store"

export const storeFactory = (id) => {
    const _acl = {
        'everyone': ['store.get', 'store.list'], 
        'authenticated': ['store.post'] 
    }

    const model = getStoreById(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}