'use strict'
const {Author} = require('./model')

module.exports.create = async (event) => {

  try{
    console.log('before create authors')
    console.log('body: '+event.body)
    const author = JSON.parse(event.body)
    author.birthdate = new Date()
    const result = await Author.create(author)
    console.log('after create authors')
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
