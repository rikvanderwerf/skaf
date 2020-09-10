import { getProductById } from "../../models/product"
import { acl } from "./factories"
import { getStoreById } from "../../models/store"

export const catalogItemFactory = async (id, args, context) => {
    const _acl = {}
    console.log(args.catalogItemInput)
    if (args.catalogItemInput && args.catalogItemInput.storeId) {
        const store = await getStoreById(args.catalogItemInput.storeId)
        const retailer  = await store.retailer()
        if (retailer.userCreatedId == context.user.id) {
            const user = `user:${retailer.userCreatedId}`
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
