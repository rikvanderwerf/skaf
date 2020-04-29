import { Model } from 'sequelize'
import { CatalogItem } from './catalog_item'

export class CatalogItemVariant extends Model {
    public id!: string
    public amount!: number 
    public unit!: string 
    public catalogItemId!: string
    public priceId!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
                unique: false 
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
            },
            catalogItemId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: false,
                field: 'catalog_item_id'
            },
            priceId: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: false,
                field: 'price_id'
            } 
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.CatalogItem, {
            foreignKey: 'catalog_item_id'
        })
        this.hasOne(models.Price, {
            foreignKey: 'price_id'
        })
    }

    catalogItem = () => {
        return CatalogItem.findOne()
    }
}  