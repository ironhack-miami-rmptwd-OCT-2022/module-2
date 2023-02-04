const express = require('express');
const router = express.Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const uploadCloud = require("../config/cloudinary.js")
const nodemailer = require("nodemailer");

/* GET home page */
router.get("/books", (req, res, next) => {
    Book.find().populate("author")
    .then((allTheBooks)=>{

    res.render("booksviews/books", {listOfBooks: allTheBooks});
    })
    .catch((err)=>{
        next(err);
    })
});



router.get("/books/create", (req, res, next)=>{
    Author.find()
    .then((allAuthors)=>{
        res.render("booksviews/new-book", {authors: allAuthors})
    })
    .catch((err)=>{
        next(err);
    })
})




router.post("/books/create-new", uploadCloud.single("imageIdentifier"), (req, res, next)=>{
    Book.create({
        title: req.body.title, 
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
        image_url: req.file.path,
    })
    .then((result)=>{

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
              user: 'nick.borbe@ironhack.com',
              pass: process.env.GMAILPASS
            }
          });
          
          var mailOptions = {
            from: 'IronhackBookLibraryFoundation@ihapps.com',
            to: req.body.donorEmail,
            subject: 'Thank You For Your Donation',
            html: `<p>Thank you for your donation!  ${req.body.title} will make an excellent addition to our library!`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.redirect('/books');
            } else {
              console.log('Email sent: ' + info.response);    
              res.redirect('/books');
            }
          });  
          })

    .catch((err)=>{
        next(err);
    })
})



router.get("/books/:bookID", (req, res, next)=>{
    Book.findById(req.params.bookID).populate("author")
    .then((theBook)=>{
        console.log("=-=--=-=-=-=-=-=-");
        console.log(theBook);
        res.render("booksviews/book-details", {theBook: theBook})
    })
    .catch((err)=>{
        next(err);
    })
})


router.get("/books/edit/:id", (req, res, next)=>{
    Book.findById(req.params.id)
    .then((theBook)=>{
        Author.find()
        .then((allAuthors)=>{
            allAuthors.forEach((author)=>{
                if(author._id.equals(theBook.author)){
                    author.preselected = true;
                }
            })
            res.render("booksviews/edit", {book: theBook, authors: allAuthors})
        })
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
