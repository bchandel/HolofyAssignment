const bookRepo = require('./books-repository').BookData;
const config = require('../../config/config.json');
const moment = require('moment');
const bookUtils = require('../utils/book-utils');

class BookService {
  constructor(db) {
    this.db = db;
  }

  async getBookById(id) {
    let book =  await bookRepo.getBooksByUuid(this.db,id);
    return book;
  }

  async addBook(bookData) {
    try {
      let books = {
        'name': bookData.name,
        'authorName': bookData.authorName,
        'releaseDate': moment(bookData.releaseDate)
      }
      let systemId = bookUtils.generateSystemID(bookData); 
      books.uuid = systemId;
      const book = await bookRepo.createBook(this.db, books);
      return book;
    } catch (err) {
      console.error(err);
    }
  }

  async updateBook(id, bookData) {
    let criteria = {uuid: id};
    let update = {
        $set : {
            "name" : bookData.name,
            "authorName" : bookData.authorName,
            "releaseDate": moment(bookData.releaseDate)
        }
    };
    let book = await bookRepo.findOneAndUpdate(this.db,criteria,update);
    return book;
  }

  async deleteBook(id) { 
    return  await bookRepo.deleteBook(this.db,id);
  }

}
module.exports = {
  bookService: function(db) {
    return new BookService(db);
  }
};
