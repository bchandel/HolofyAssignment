const router = require('express').Router();
const config = require('../../config/config.json');
const ObjectId = require('mongodb').ObjectID;
const books = require('./books');


const getBookDetail = async (req, res) => {
  try{
    if(!req.params.bookUuid){
        return res.status(400).json({message: 'Bad Request.Missing required parameter (bookUuid)'});
    }
    let book = await books.bookService(req.db).getBookById(req.params.bookUuid);
    return res.status(200).json({success: true, data: book});
  }catch(error){
    return res.status(500).json({message: error});
  }
};

const getAllBooks = async (req, res) => {
    try{
        let books =  await req.db.Book.find({});
        return res.status(200).json({success: true, data: books});
    }catch(error){
        return res.status(500).json({message: error});
    }
};

const updateBookDetails = async (req, resp) => {
  try {
    if(!req.params.bookUuid){
        return res.status(400).json({message: 'Bad Request.Missing required parameter (bookUuid)'});
    }
    const book = await books.bookService(req.db).updateBook(req.params.bookUuid, req.body);

    if(book.ok ==1){
      return resp.status(200).json({success: true, message:"Book updated successfully." });
    }else{
      return resp.status(200).json({success:false, message: err.message });
    }
    
  } catch (err) {
    console.error(err);
    return resp.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, resp) => {
    try {
        if(!req.params.bookUuid){
            return res.status(400).json({message: 'Bad Request.Missing required parameter (bookUuid)'});
        }
        const book = await books.bookService(req.db).deleteBook(req.params.bookUuid);
        
        return resp.status(200).json({success: true, message :'Book deleted successfully'});
      
    } catch (err) {
      console.error(err);
      return resp.status(500).json({ message: err.message });
    }
};

const addBook = async (req, resp) => {
    try {
      const book = await books.bookService(req.db).addBook(req.body);
     
      return resp.status(200).json({success:true, data: book });
    } catch (err) {
      console.error(err);
      return resp.status(500).json({ message: err.message });
    }
};

router
  .get('/:bookUuid', getBookDetail)
  .get('/', getAllBooks)
  .post('/:bookUuid/update', updateBookDetails)
  .post('/:bookUuid/delete', deleteBook)
  .post('/add', addBook);

module.exports = router;
