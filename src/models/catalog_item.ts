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
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'product_id'
            },
            storeId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'store_id'
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            foreignKey: 'product_id'
        })
        this.belongsTo(models.Store, {
            foreignKey: 'store_id'
        })
        this.hasMany(models.CatalogItemVariant, {
            foreignKey: 'catalog_item_id',
            as: 'catalogItem'
        })
    }

    product = () => {
        return Product.findOne()
    }
}
