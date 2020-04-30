import { acl } from './factories'
import { getRetailerById } from '../../models/retailer'

export const retailerUserFactory = async (id, args, context) => {
    const _acl = {}

    if (args.retailerUserInput && args.retailerUserInput.retailerId) {
        const retailer  = await getRetailerById(args.retailerUserInput.retailerId)
        const retailerUsers = await retailer.getRetailerUsers()
        if (retailerUsers.filter(retailerUser => retailerUser.userId == context.user.id && retailerUser.role == 'admin').length > 0) {
            const user = `user:${context.user.id}`
            _acl[user] = ['retailerUser.post'] 
        }
    }

    const self = {
        _acl
    }
    return Object.assign(self, acl(self))
}