import { acl } from "./factories"
import { getRetailer } from "../../models/retailer"

export const retailerFactory = (id) => {
    const _acl = {
        'everyone': ['retailer.get', 'retailer.list'], 
        'authenticated': ['retailer.post'] 
    }

    const model = getRetailer(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}


