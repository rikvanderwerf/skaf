import { Catalog } from './catalog'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../database/database'
import { Location } from './location'

export class Store extends Model {
    public id!: string 
    public name!: string
}

Store.init({
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        
        allowNull: false
    }
}, {
    sequelize: sequelize
})

export const StoreLocation = Store.hasOne(Location, {
    foreignKey: 'location_id'
})

Store.hasOne(Catalog, {
    foreignKey: 'catalog_id'
})

function createStore(storeInput) {
    return Store.create(storeInput)
}

export function getStore(storeInput) {
    return Store.findOne({
        where: storeInput
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
        return getStore(storeInput)
    },
    list: (storeInput) => {
        return listStores(storeInput)
    }
})