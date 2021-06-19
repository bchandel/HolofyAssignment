const books = require('./books/routes');

module.exports = {
  booksRoutes: function(app) {
    // console.log("I am here ** index ");
    app.use('/book', books);
  }
};
