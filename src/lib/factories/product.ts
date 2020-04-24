import { getProductById } from "../../models/product"
import { acl } from "./factories"
import { getStoreById } from "../../models/store"

export const productFactory = async (id, args, context) => {
    const _acl = {}
    if (args.productInput.storeId) {
        const store = await getStoreById(args.productInput.storeId)
        const retailer  = await store.retailer()
        if (retailer.userCreatedId == context.user.id) {
            const user = `user:${retailer.userCreatedId}`
            _acl[user] = ['product.put'] 
        }
    }

    const model = getProductById(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}
