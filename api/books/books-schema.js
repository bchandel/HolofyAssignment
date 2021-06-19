const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    uuid: { type: String, index: true, unique: true },
    name: { type: String },
    authorName: { type: String },
    releaseDate: { type: Date }
  },
  { timestamps: true}
);

BookSchema.index({ uuid: 1, authorName: 1 });
BookSchema.index({ uuid: 1 });

module.exports = {
  Book: BookSchema
};
