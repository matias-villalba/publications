'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../db/connection')
const Author = require('./Author');

const {and, or, lt, gt, startsWith} = Sequelize.Op

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


Publication.findOrderByDatetime = (limit, order) => {
  return Publication.findAll({
    order: [['publicationDatetime', order],['id', order]],
    limit: limit,
    include: [ Author ]
  })
}

Publication.findByTitle = (limit, title) => {

  return Publication.findAll({include: [ Author ],
    where: Sequelize.where(
      Sequelize.fn("lower", Sequelize.col("title")),
      { [Sequelize.Op.like]: Sequelize.fn("lower", title+'%') }
    ),
    order: [['title', 'ASC'],['authorId', 'ASC']],
    limit: limit,
  });


}



Publication.findUntilADate = (limit, order, datetime, delimiterItemId) => {
  return Publication.findAll({where: {
                                      [or]:[
                                        {[and]:[
                                            {publicationDatetime:datetime},
                                            {id: {[lt]: delimiterItemId}}
                                        ]},
                                        {publicationDatetime: {[lt]: datetime}}
                                      ]
                                },
                            order: [['publicationDatetime', order],['id', order]],
                            limit: limit,
                            include: [ Author ]
                            })
}

Publication.findSinceADate = (limit, order, datetime, delimiterItemId) => {
  return Publication.findAll({where: {
    [or]:[
      {[and]:[
        {publicationDatetime:datetime},
        {id: {[gt]: delimiterItemId}}
      ]},
      {publicationDatetime: {[gt]: datetime}}
    ]
  },
    order: [['publicationDatetime', order],['id', order]],
    limit: limit,
    include: [ Author ]
  })

}




module.exports = Publication

/*
 require('pg').types.setTypeParser(1114, stringValue => {
 return new Date(stringValue + '+0000');
 // e.g., UTC offset. Use any offset that you would like.
 });

*/