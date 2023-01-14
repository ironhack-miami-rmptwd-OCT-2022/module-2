const express = require('express');
const router = express.Router();
const Author = require("../models/Author.model");

router.get("/authors", (req, res, next) => {
    Author.find()
    .then((authors)=>{

    res.render("authorsviews/authors", {listOfAuthors: authors});
    })
    .catch((err)=>{
        next(err);
    })
});


router.get("/authors/create", (req, res, next)=>{
    res.render("authorsviews/new-author")
})
router.post("/authors/create", (req, res, next)=>{
        Author.create({
            name: req.body.name, 
            hometown: req.body.hometown, 
            birthday: req.body.birthday, 
            image_url: req.body.image,
        })
        .then((result)=>{
            res.redirect("/authors");
        })
        .catch((err)=>{
            next(err);
        })
})

router.get("/authors/edit/:id", (req, res, next)=>{
    Author.findById(req.params.id)
    .then((theAuthor)=>{
        res.render("authorsviews/edit", {author: theAuthor})
    })
    .catch((err)=>{
        next(err)
    })
})





router.get("/authors/:id", (req, res, next)=>{
    Author.findById(req.params.id)
    .then((theAuthor)=>{
        res.render("authorsviews/author-details", {theAuthor: theAuthor})
    })
    .catch((err)=>{
        next(err);
    })
})


router.post("/authors/update/:id", (req, res, next)=>{
    Author.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        birthday: req.body.birthday,
        image_url: req.body.image,
        hometown: req.body.hometown
    })
    .then((result)=>{
        res.redirect("/authors/"+req.params.id)
    })
    .catch((err)=>{
        next(err);
    })
})


router.post("/authors/delete/:id", (req, res, next)=>{
    Author.findByIdAndDelete(req.params.id)
    .then((x)=>{
        res.redirect("/authors");
    })
    .catch((err)=>{
        next(err);
    })
})




module.exports = router;