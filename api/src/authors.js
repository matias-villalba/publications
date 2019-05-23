'use strict'
const {Author} = require('./model')

const  headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

module.exports.create = async (event) => {

  try{
    console.log('before create authors')
    console.log('body: '+event.body)
    const author = JSON.parse(event.body)
    const persistedAuthor = await Author.create(author)
    console.log('after create authors')
    console.log(JSON.stringify(persistedAuthor, null, 2))

    return {
      statusCode: 200,
      headers:headers,
      body: JSON.stringify({id:persistedAuthor.id}, null, 2),
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
    console.log('before update author')
    console.log('id of path: '+event.pathParameters.authorId)
    console.log('body: '+event.body)
    const author = JSON.parse(event.body)

    const result = await Author.update(author ,{where: {id:event.pathParameters.authorId}})
    console.log('after update author')
    console.log(JSON.stringify(result, null, 2))

    return {
      statusCode: 200,
      headers:headers,
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
    console.log('before delete author')
    console.log('id of path: '+event.pathParameters.authorId)

    const result = await Author.destroy({where: {id:event.pathParameters.authorId}})
    console.log('after delete author')
    console.log(JSON.stringify(result, null, 2))
    return {
      statusCode: 200,
      headers:headers,
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



module.exports.get = async (event) => {

  try{
    console.log('before get authors')
    const authors = await Author.findAll()
    console.log('after get authors')
    console.log(JSON.stringify(authors, null, 2))

    return {
      statusCode: 200,
      headers:headers,
      body: JSON.stringify(authors, null, 2),
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
    console.log('before get author')
    const author = await Author.findByPk(event.pathParameters.authorId)
    console.log('after get author')
    console.log(JSON.stringify(author, null, 2))

    return {
      statusCode: 200,
      headers:headers,
      body: JSON.stringify(author, null, 2),
    }

  }catch(e){
    console.log('errror')
    console.log(e)
    return {
      statusCode: 500
    }
  }
}
