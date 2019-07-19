'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../db/connection')

class Author extends Sequelize.Model {}
Author.init({
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  birthdate: { type: Sequelize.DATE }
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  underscored: true,
  sequelize,
  modelName: 'author' })

module.exports = Author
