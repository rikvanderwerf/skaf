import { Sequelize, Model, DataTypes } from 'sequelize'
import { Product } from '../models/product'
import { Store } from '../models/store'
import { Address } from '../models/address'
import { Price } from '../models/price'
import { ProductType } from '../models/product_type'
import { Retailer } from '../models/retailer'
import { User } from '../models/user'
import { Location } from '../models/location'
import { Flavor } from '../models/flavor'
import { Effect } from '../models/effect'
import { CatalogItem } from '../models/catalog_item'
import { CatalogItemVariant } from '../models/catalog_item_variant'

export const sequelize: Sequelize = new Sequelize('postgres://login_role:password@postgresql_db:5432/postgres')

const models: object = {
    'Address': Address.init(sequelize, Sequelize),
    'CatalogItem': CatalogItem.init(sequelize, Sequelize),
    'CatalogItemVariant': CatalogItemVariant.init(sequelize, Sequelize),
    'Effect': Effect.init(sequelize, Sequelize),
    'Flavor': Flavor.init(sequelize, Sequelize),
    'Location': Location.init(sequelize, Sequelize),
    'Price': Price.init(sequelize, Sequelize),
    'Product': Product.init(sequelize, Sequelize),
    'ProductType': ProductType.init(sequelize, Sequelize),
    'Retailer': Retailer.init(sequelize, Sequelize),
    'Store': Store.init(sequelize, Sequelize),
    'User': User.init(sequelize, Sequelize)
}

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => typeof model.associate(models))
