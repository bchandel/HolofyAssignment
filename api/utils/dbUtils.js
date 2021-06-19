var mongoose = require('mongoose');

module.exports = {
  dbConnection: function(dbPath, options) {
    return mongoose.createConnection(dbPath, options);
  }
};
