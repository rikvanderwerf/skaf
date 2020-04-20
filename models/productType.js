const { DataTypes} = require('sequelize');
const { sequelize } = require('../../database/database.js')

var ProductType = sequelize.define('ProductType', {
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

ProductType.hasMany(ProductType, { 
    as: 'child_products',
    foreignKey: 'product_type_parent_id'
})
