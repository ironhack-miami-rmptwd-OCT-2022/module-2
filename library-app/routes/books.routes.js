const express = require('express');
const router = express.Router();
const Book = require("../models/Book.model");

/* GET home page */
router.get("/books", (req, res, next) => {
    Book.find()
    .then((allTheBooks)=>{

    res.render("booksviews/books", {listOfBooks: allTheBooks});
    })
    .catch((err)=>{
        next(err);
    })
});



router.get("/books/create", (req, res, next)=>{
    res.render("booksviews/new-book")
})


router.post("/books/create-new", (req, res, next)=>{
    Book.create({
        title: req.body.title, 
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating
    })
    .then((result)=>{
        res.redirect("/books");
    })
    .catch((err)=>{
        next(err);
    })
})



router.get("/books/:bookID", (req, res, next)=>{
    Book.findById(req.params.bookID)
    .then((theBook)=>{
        res.render("booksviews/book-details", {theBook: theBook})
    })
    .catch((err)=>{
        next(err);
    })
})






module.exports = router;
