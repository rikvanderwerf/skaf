import { getProductById } from "../../models/product"
import { acl } from "./factories"
import { getStoreById } from "../../models/store"

export const catalogItemFactory = async (id, args, context) => {
    const _acl = {}

    if (args.catalogItemInput && args.catalogItemInput.storeId) {
        const store = await getStoreById(args.catalogItemInput.storeId)
        const retailer  = await store.retailer()
        const retailerUsers = await retailer.getRetailerUsers()
        if (retailerUsers.filter(retailerUser => retailerUser.userId == context.user.id).length > 0) {
            const user = `user:${context.user.id}`
            _acl[user] = ['catalogItem.post'] 
        }
    }

    const model = getProductById(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}
