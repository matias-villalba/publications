'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../db/connection')
const Author = require('./Author');

class Publication extends Sequelize.Model {}
Publication.init({
  title: {type: Sequelize.STRING, allowNull: false},
  body: {type: Sequelize.TEXT, allowNull: false },
  publicationDatetime: {type: Sequelize.DATE, allowNull: false},
  authorId: {type: Sequelize.INTEGER}
}, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,
  underscored: true,
  sequelize, modelName: 'publication' });


Publication.findWithSummarizedBody = () => {
   return Publication.findAll({ include: [ Author ], attributes: {
      include: [[sequelize.fn('LEFT', sequelize.col('body'), 40), 'summarizedBody']],
      exclude: ['body', 'authorId']
      }
   })
}

module.exports = Publication

/*
 require('pg').types.setTypeParser(1114, stringValue => {
 return new Date(stringValue + '+0000');
 // e.g., UTC offset. Use any offset that you would like.
 });

*/