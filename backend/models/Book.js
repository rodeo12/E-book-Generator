const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  frontCoverImage: { type: String, required: true },
  backCoverImage: { type: String, required: true },
  pages: [
    {
      pageNumber: { type: Number, required: true },
      content: { type: String, required: true },
      images: [{ type: String }],
    },
  ],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
