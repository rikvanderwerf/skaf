import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const Price = sequelize.define('price', {
    id: {
        primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priceInCents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'price_in_cents'
    }
})