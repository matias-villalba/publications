'use strict'
const {Publication, Author} = require('./model')

const DEFAULT_ITEMS_PER_PAGE = 5
const DEFAULT_SINCE_OR_UNTIL = 'until'
//delimiterItemId
//itemsPerPage
//sinceOrUntilDatetime  (since | until)
//datetime

//Publication.findByAuthorIdOrderByDatetime (limit, order, authorId)
//Publication.findByAuthorSinceADate (limit, order, datetime, delimiterItemId, authorId)
//Publication.findByAuthorUntilADate (limit, order, datetime, delimiterItemId, authorId)

const getFindingStrategy = (condition)=>{
  const order = condition.newestFirst?'DESC':'ASC'
  if(!condition.datetime || !condition.delimiterItemId){
    return (condition.authorId)?
        (itemsPerPage, datetime, delimiterItemId) => Publication.findByAuthorIdOrderByDatetime(itemsPerPage, order, condition.authorId):
        (itemsPerPage, datetime, delimiterItemId) => Publication.findOrderByDatetime(itemsPerPage, order)
  }
  if(condition.sinceOrUntilDatetime === 'since'){
    return (condition.authorId)?
        ((itemsPerPage, datetime, delimiterItemId) => Publication.findByAuthorSinceADate(itemsPerPage, order, datetime, delimiterItemId, condition.authorId) ):
          ((itemsPerPage, datetime, delimiterItemId) => Publication.findSinceADate(itemsPerPage, order, datetime, delimiterItemId) )
  }else{
    return (condition.authorId)?
      ((itemsPerPage, datetime, delimiterItemId) => Publication.findByAuthorUntilADate(itemsPerPage, order, datetime, delimiterItemId, condition.authorId )):
    ((itemsPerPage, datetime, delimiterItemId) => Publication.findUntilADate(itemsPerPage, order, datetime, delimiterItemId ))
  }

}

module.exports.get = async (event) => {
  try{
    console.log('before find publications')

    const queryStringParameters = event.queryStringParameters? event.queryStringParameters : {}
    const {delimiterItemId, datetime, authorId} = queryStringParameters

    const itemsPerPage = queryStringParameters.itemsPerPage? queryStringParameters.itemsPerPage: DEFAULT_ITEMS_PER_PAGE
    const sinceOrUntilDatetime = queryStringParameters.sinceOrUntilDatetime? queryStringParameters.sinceOrUntilDatetime: DEFAULT_SINCE_OR_UNTIL
    const newestFirst = queryStringParameters.newestFirst === undefined ? true : !(queryStringParameters.newestFirst.toLowerCase() == 'false')

    const findPublications = getFindingStrategy({datetime, delimiterItemId, sinceOrUntilDatetime, newestFirst, authorId})
    const publications = await findPublications(itemsPerPage, datetime, delimiterItemId)

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


module.exports.getByTitle = async (event) => {
  try{

    console.log('before get publication')
    const publication = await Publication.findByTitle(10, event.queryStringParameters.publicationTitle)
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


module.exports.getById = async (event) => {
  try{
    console.log('before get publication')
    const publication = await Publication.findOne({where: {id: event.pathParameters.publicationId}, include: [ Author ] } )
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
