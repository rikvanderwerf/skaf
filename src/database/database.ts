import { Sequelize, Model } from 'sequelize'
import { Product } from '../models/product'
import { Store } from '../models/store'

export const sequelize = new Sequelize('postgres://login_role:password@postgresql_db:5432/postgres')

const models = {
    'Product': Product,
    'Store': Store,
}

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models))

export const db = {
    ...models,
    sequelize
}