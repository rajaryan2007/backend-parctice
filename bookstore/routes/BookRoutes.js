const express = require('express');
const { getAllBooks, getSingleBookById, updateBook, deleteBook, addNewBook } = require('../controllers/Book-controllers')

//create express require 
const router = express.Router()

//all routes that are realated to books only 
router.get('/get',getAllBooks);
router.get('/get/:id',getSingleBookById);
router.post('/add',addNewBook);
router.put('/update/:id',updateBook);
router.delete('/delete/:id',deleteBook);

module.exports = router;