const Sequalize = require('sequelize');

export const sequelize = new Sequalize('postgres://login_role:password@postgresql_db:5432/postgres')

