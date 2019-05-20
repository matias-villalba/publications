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
    return {
      statusCode: 500
    }
  }
}

module.exports.getById = async (event) => {
  try{
    console.log('before get publication')
    const publication = await Publication.findOne({ include: [ Author ] }, {where: {id: event.pathParameters.publicationId} })
    console.log('after get publication')
    console.log(JSON.stringify(publication, null, 2))

    return {
      statusCode: 200,
      body: JSON.stringify(publication, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
    return {
      statusCode: 500
    }
  }
}


module.exports.getWithSummarizedBody = async (event) => {
  try{
    console.log('before find publications')
    const publications = await Publication.findWithSummarizedBody()
    console.log('after find publications')
    console.log(JSON.stringify(publications, null, 2))
    return {
      statusCode: 200,
      body: JSON.stringify(publications, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
    return {
      statusCode: 500
    }
  }
}



module.exports.create = async (event) => {

  try{
    console.log('before create publication')
    console.log('body: '+event.body)
    const publication = JSON.parse(event.body)

    publication.authorId = publication.author.id
    delete publication['author']
    const persistedPublication = await Publication.create(publication)
    const result = {id: persistedPublication.id}
    console.log('publication persisted with id'+result.id)
    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
    return {
      statusCode: 500
    }
  }
}


module.exports.update = async (event) => {

  try{
    console.log('before update publication')
    console.log('id of path: '+event.pathParameters.publicationId)
    console.log('body: '+event.body)
    const author = JSON.parse(event.body)

    const result = await Publication.update(author ,{where: {id:event.pathParameters.publicationId}})
    console.log('after update publication')
    console.log(JSON.stringify(result, null, 2))

    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
    return {
      statusCode: 500
    }
  }
}

module.exports.delete = async (event) => {

  try{
    console.log('before delete publication')
    console.log('id of path: '+event.pathParameters.publicationId)

    const result = await Publication.destroy({where: {id:event.pathParameters.publicationId}})
    console.log('after delete publication')
    console.log(JSON.stringify(result, null, 2))
    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
    return {
      statusCode: 500
    }
  }
}
