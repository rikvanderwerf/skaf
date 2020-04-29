import { Model } from 'sequelize'
import { Product } from './product'

export class CatalogItem extends Model {
    public id!: string
    public description: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.Product, {
            foreignKey: 'product_id'
        })
    }

    product = () => {
        return Product.findOne()
    }
}
