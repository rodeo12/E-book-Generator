const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to create a new book
router.post('/create', bookController.createBook);

// Route to update book content
router.put('/update/:id', bookController.updateBook);

// Route to get a book by ID
router.get('/:id', bookController.getBookById);

// Route to get a book by name
router.get('/name/:title', bookController.getBookByName);

module.exports = router;
