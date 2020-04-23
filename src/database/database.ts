import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('postgres://login_role:password@postgresql_db:5432/postgres')