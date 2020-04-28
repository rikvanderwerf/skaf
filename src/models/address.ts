import { Model } from 'sequelize'

export class Address extends Model {
    public id!: string
    public streetName!: string
    public postalCode!: string
    public city!: string
    public country!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
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
        }, {
            sequelize: sequelize
        })
    }
}