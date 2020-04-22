import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const Address = sequelize.define('address', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    streetName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'street_name'
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'postal_code'
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})