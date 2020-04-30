import { acl } from "./factories"
import { getRetailerById } from "../../models/retailer"

export const retailerFactory = (id) => {
    const _acl = {
        'everyone': ['retailer.get', 'retailer.list'], 
        'authenticated': ['retailer.post'] 
    }

    const model = getRetailerById(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}


