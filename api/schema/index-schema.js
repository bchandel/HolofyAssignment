const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var Counter = new Schema({
    id: String,
    sequenceNumber: Number
});

module.exports = {
    Counter
};
