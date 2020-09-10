import { getProductById } from "../../models/product"
import { acl } from "./factories"

export const productFactory = async (id, args, context) => {
    const _acl = {}

    const model = getProductById(id)

    const self = {
        _acl,
        model
    }
    return Object.assign(self, acl(self))
}
