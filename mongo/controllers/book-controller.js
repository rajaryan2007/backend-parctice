const Author = require('../models/Author');
const Book = require('../models/Book');

const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);  // FIXED: use 'new' instead of calling Author()
        await author.save();

        res.status(201).json({
            success: true,  // FIXED: typo 'ture' → 'true'
            data: author,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);  // FIXED: use 'new'
        await book.save();

        res.status(201).json({
            success: true,  // FIXED: this was false by mistake
            data: book,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,  // FIXED: use boolean false, not string "false"
            message: "Some error occurred",  // FIXED: typo "ocurr" → "occurred"
        });
    }
};

const getBookWithAuthor = async (req,res)=>{
    try {
        const book = await Book.findById(req.params.id).populate('author');

        if(!book){
            return res.status(404).json({
                success:false,
                message:'book not found'
            });
        };
        res.status(200).json({
            sucess:true,
            data:book
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,  // FIXED: use boolean false, not string "false"
            message: "Some error occurred",  // FIXED: typo "ocurr" → "occurred"
        });
    }
}

module.exports = { createAuthor, createBook,getBookWithAuthor };
