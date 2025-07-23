const Book = require('../models/Book')
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find({});
        if (allBooks?.length > 0) {
            res.status(200).json({
                success: true,
                message: 'list of all mook in data',
                data: allBooks
            });

        } else {
            res.status(404).json({
                success: false,
                message: ' book found'
            })

        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'something went wrong please try again'
        })

    }

}
const getSingleBookById = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const CurrentBookID = await Book.findById(getCurrentBookID);

        if(!CurrentBookID){
            return res.status(404).json({
                success:false,
                message:'book with teh current ID is not found plase try with '
            })
        }
        res.status(200).json({
            success:true,
            message:'here is the book by id',
            data:CurrentBookID
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'something went wrong please try again'
        })
    }
}
const addNewBook = async (req, res) => {
    try {
        const newBookFromData = req.body;
        const newlyCreatedBook = await Book.create(newBookFromData);

        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: newlyCreatedBook,
        });

    } catch (error) {
        console.error(error);

        // Mongoose validation error handling
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: error.errors,
            });
        }

        // Other errors
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

const updateBook = async (req, res) => {
    try{
    const updateBookFromData = req.body;
    const BookForUpdate = req.params.id;
    const BookForUpdateByID = await Book.findByIdAndUpdate(BookForUpdate,updateBookFromData,{new:true});
    
    if(!BookForUpdateByID){
        return res.status(404).json({
            success:false,
            message:"book in not found with this ID",
            
        });
    }
        res.status(200).json({
        success:true,
        message:'books is updated from know thank u ',
        data: BookForUpdateByID,

    });
    
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:'unabel to find '
        })
    }   

}
const deleteBook = async (req, res) => {
     const deleteByID = req.params.id;
    const deleteByIDBook = await Book.findByIdAndDelete(deleteByID);
    if(!deleteByID){
        res.status(404).json({
            success:false,
            message:'enable to delete the boook by id'
        })
    }
    res.status(200).json({
        success:true,
        message: 'book is delete sucessfully ',
        data: deleteByIDBook
    })
}

module.exports = {
    getAllBooks,
    getSingleBookById,
    addNewBook,
    updateBook
    , deleteBook
}