'use strict'
const Author = require ('./Author')
const Publication = require ('./Publication')

Author.hasMany(Publication, {foreignKey: 'authorId', sourceKey: 'id'});
Publication.belongsTo(Author, {foreignKey: 'authorId', sourceKey: 'id'});

module.exports.Author = Author
module.exports.Publication = Publication