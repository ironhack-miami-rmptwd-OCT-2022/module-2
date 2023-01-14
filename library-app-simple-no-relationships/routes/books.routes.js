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
        rating: req.body.rating,
        image_url: req.body.image
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


router.get("/books/edit/:id", (req, res, next)=>{
    Book.findById(req.params.id)
    .then((theBook)=>{
        res.render("booksviews/edit", {book: theBook})
    })
    .catch((err)=>{
        next(err)
    })
})
router.post("/books/update/:id", (req, res, next)=>{
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title, 
        author: req.body.author,
        image_url: req.body.image,
        rating: req.body.rating,
        description: req.body.description
    })
    .then((result)=>{
        res.redirect("/books/"+req.params.id)
    })
    .catch((err)=>{
        next(err);
    })
})


router.post("/books/delete/:id", (req, res, next)=>{
    Book.findByIdAndDelete(req.params.id)
    .then((x)=>{
        res.redirect("/books");
    })
    .catch((err)=>{
        next(err);
    })
})






module.exports = router;
