import { DataTypes} from 'sequelize'
import { sequelize } from '../database/database'

export const ProductType = sequelize.define('productType', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
})

ProductType.belongsTo(ProductType, {
    as: 'parent',
    foreignKey: 'product_type_parent_id'
})

function listProductTypes(productTypeInput) {
    return ProductType.findAll({
        productTypeInput
    })
}

export const generateProductTypeModel = (user) => ({
    list: (productTypeInput) => {
        listProductTypes(productTypeInput)
    }
})
