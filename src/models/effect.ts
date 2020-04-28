import { Model } from 'sequelize'

export class Effect extends Model {
    public id!: string
    public type!: string
    public effect!: string

    static init(sequelize, DataTypes) {
        return super.init.call(this, {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            type: {
                type: DataTypes.ENUM(['positive', 'negative', 'medical'])
            },
            effect: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize: sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Product, {
            through: 'ProductEffects'
        })
    }
}

export function createEffect(effectInput) {
    return Effect.create(effectInput)
}