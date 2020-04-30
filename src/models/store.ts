import { Model } from 'sequelize'
import { Retailer } from './retailer'

export class Store extends Model {
    public id!: string 
    public name!: string
    public retailerId!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            retailerId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "retailer_id"
            }
        }, {sequelize: sequelize})
    }

    static associate(models) {
        this.hasMany(models.CatalogItem, {
            foreignKey: 'store_id'
        })
    }

    retailer = () => {
        return Retailer.findOne()
    }

    _acl = async() => {
        const acl = {}
        const retailer = await this.retailer()
        const users = await retailer.getRetailerUsers()
        users.forEach(retailerUser => acl[`user:${retailerUser.userId}`] = ['store.put']) 
        
        return acl
    }

    acl = this._acl()
}


function createStore(storeInput) {
    return Store.create(storeInput)
}

export function getStoreById(id) {
    return Store.findOne({
        where: {
            id: id
        }
    })
}

function listStores(storeInput) {
    return Store.findAll({
        where: storeInput
    })
}

export const generateStoreModel = () => ({
    create: (storeInput) => {
        return createStore(storeInput)
    },
    get: (storeInput) => {
        return getStoreById(storeInput)
    },
    list: (storeInput) => {
        return listStores(storeInput)
    }
})