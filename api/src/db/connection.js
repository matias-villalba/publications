'use strict'
const Sequelize = require('sequelize');

const connectionUri = (process.env.DATABASE_CONNECTION_URI || 'postgres://publicationsadmin:publicationsadmin@localhost:5432/publications')
console.log('connectionUri:' +connectionUri )


const sequelize = new Sequelize(connectionUri, {
  dialect: 'postgres',
  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize