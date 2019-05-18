'use strict'
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize =  new Sequelize('publications', 'publicationsadmin', 'publicationsadmin', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = sequelize