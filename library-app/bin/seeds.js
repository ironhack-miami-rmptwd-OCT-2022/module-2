const mongoose = require('mongoose');
const Book = require('../models/Book.model');


require("../db");


const bunchaBooks = [
    {
        title: "The Catcher In The Rye",
        author: "JD Salinger",
        rating: 8,
        description: "teenage guy thinks everything is phony and complains a lot"
    },
    {
        title: "The Sun Also Rises",
        author: "Ernest Hemingway",
        rating: 9,
        description: "guy who is injured from war drinks a lot in the 40s and parties with high society"
    },
    {
        title: "Zen and the Art of Motorcycle Maintenance",
        author: "Robert Pirsig",
        rating: 10,
        description: "guy and his son take a motorcycle trip and reflect on life"
    },
    {
        title: "Orlando",
        author: "Virginia Woolfe",
        rating: 5,
        description: "its like a guy who turns into a woman at some point and then turns back later"
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        author: "JK Rowling",
        rating: 7,
        description: "Hermione is super competent and saves her irresponsible firends a buncha times and then harry gets lucky and is the hero"
    }
]



 
Book.create(bunchaBooks)
  .then(booksFromDB => {
    console.log(`Created ${booksFromDB.length} books`);
 
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));