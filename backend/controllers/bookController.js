const Book = require('../models/Book');


// Controller to create a new book
exports.createBook = async (req, res) => {
  try {
    const { userId, title, frontCoverImage, backCoverImage, pages } = req.body;
    const newBook = new Book({
      userId,
      title,
      frontCoverImage,
      backCoverImage,
      pages,
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
     // Handle errors 
    res.status(500).json({ error: 'Failed to create book', details: error.message });
  }
};

// Controller to update book content
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book', details: error.message });
  }
};

// Controller to get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('userId', 'username email');
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get book', details: error.message });
  }
};


// Controller to get a book by name
exports.getBookByName = async (req, res) => {
    try {
      const title = req.params.title;
      const book = await Book.findOne({ title: new RegExp('^' + title + '$', 'i') }).populate('userId', 'username email');
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get book', details: error.message });
    }
  };