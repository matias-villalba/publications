'use strict'
const {Publication, Author} = require('./model')

module.exports.get = async (event) => {


  try{
    console.log('before find publications')
    const publications = await Publication.findAll({ include: [ Author ] })
    console.log('after find publications')
    console.log(JSON.stringify(publications, null, 2))

    return {
      statusCode: 200,
      body: JSON.stringify(publications, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
  }
}


module.exports.create = async (event) => {

  try{
    console.log('before create publication')
    console.log('body: '+event.body)
    const publication = JSON.parse(event.body)
    publication.publicationDatetime = new Date()
    const result = await Publication.create(publication)
    console.log('after create publication')
    console.log(JSON.stringify(result, null, 2))

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
  }
}
