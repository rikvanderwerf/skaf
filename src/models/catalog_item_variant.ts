import { Model, BelongsTo } from 'sequelize'
import { CatalogItem } from './catalog_item'
import { Price } from './price'

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
        this.belongsTo(models.CatalogItem, {
            foreignKey: 'catalog_item_id'
        })
        this.belongsTo(models.Price, {
            foreignKey: 'price_id',
            as: 'price'
        })
    }

    catalogItem = () => {
        return CatalogItem.findOne()
    }

    price = () => {
        return Price.findOne()
    }
}  

function createCatalogItemVariant(catalogItemVariantInput) {
    return CatalogItemVariant.create(
        catalogItemVariantInput
    )
}

export const generateCatalogItemVariantModel = () => ({
    create: (catalogItemVariantInput) => {
        return createCatalogItemVariant(catalogItemVariantInput)
    }
})