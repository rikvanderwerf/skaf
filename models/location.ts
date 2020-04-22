import { Address } from './address'
import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const Location = sequelize.define('location', {
    id: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
    },
    latitude: {
        type: DataTypes.DECIMAL,
    },
    longitude: {
        type: DataTypes.DECIMAL,
    }
})

export const LocationAddress = Location.hasOne(Address, {
    foreignKey: 'address_id'
})
