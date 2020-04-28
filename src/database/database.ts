import { Sequelize, Model, DataTypes } from 'sequelize'
import { Product } from '../models/product'
import { Store } from '../models/store'
import { Address } from '../models/address'
import { Price } from '../models/price'
import { ProductType } from '../models/product_type'
import { Retailer } from '../models/retailer'
import { User } from '../models/user'
import { Location } from '../models/location'

const sequelize = new Sequelize('postgres://login_role:password@postgresql_db:5432/postgres')

const models = {
    'Address': Address.init(sequelize, Sequelize),
    'Location': Location.init(sequelize, Sequelize),
    'Price': Price.init(sequelize, Sequelize),
    'product': Product.init(sequelize, Sequelize),
    'ProdyctType': ProductType.init(sequelize, Sequelize),
    'Retailer': Retailer.init(sequelize, Sequelize),
    'Store': Store.init(sequelize, Sequelize),
    'User': User.init(sequelize, Sequelize)
}

const filtered = Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => typeof model.associate(models))

sequelize.sync()

export const db = {
    ...models,
    sequelize
}