function BookData() {}

BookData.prototype.getAllBooks = function(db) {
  return db.Book.find({});
};

BookData.prototype.createBook = function(db, book) {
  return db.Book.create(book);
};

BookData.prototype.getBooksByUuid = function(db, id) {
  return db.Book.findOne({ uuid: id });
};

BookData.prototype.findOneAndUpdate = function(db, criteria, update) {
  return db.Book.updateOne(criteria, update);
};

BookData.prototype.deleteBook = function(db, id) {
  return db.Book.remove({uuid: id});
};

module.exports = {
  BookData: new BookData()
};
