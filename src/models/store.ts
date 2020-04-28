import { DataTypes, Model } from 'sequelize'
import { Retailer } from './retailer'
import { Location } from './location'
import { Product } from '../models/product'

const Sequelize = require("sequelize");

export class Store extends Sequelize.Model {
    public id!: string 
    public name!: string
    public retailerId!: string

    static init(sequelize, DataTypes) {
        console.log(DataTypes)
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
        models.Store.belongsToMany(models.Product, {
            through: 'StoreProduct'
        })
    }

    retailer = () => {
        return Retailer.findOne()
    }

    _acl = async() => {
        const retailer = await this.retailer()
        const user = `user:${retailer.userCreatedId}`

        return {
            user : ['store.put']
        }
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

export const generateStoreModel = (user) => ({
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