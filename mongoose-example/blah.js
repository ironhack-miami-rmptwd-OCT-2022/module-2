const mongoose = require('mongoose');


mongoose
  .connect('mongodb://localhost/mongoose-example')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));



  const Cat = mongoose.model('Cat', { name: String });
//                            ^ this decides the name of the collection inside the DB



// this is creating a new cat named Ironhack Cat

    // const newCatToCreate = new Cat({ name: 'Ironhack Cat' });
    
    // newCatToCreate.save()
    // .then((newCat)=>{
    //         console.log("success", newCat)
    //     })
    //     .catch((err)=>{
    //             console.log("error", err);
    //         })
           




    


// this code finds a cat named Ironhack Cat and deletes from the DB

// Cat.findOneAndDelete({name: "Ironhack Cat"})
// .then((response)=>{
//     console.log(response);
// })
// .catch((error)=>{
//     console.log(error);
// })



// this code finds a cat named Ironhack Cat and edits them to be named Margo
// Cat.findOneAndUpdate({name: "Ironhack Cat"},{name: "Margo"})
// .then((response)=>{
//     console.log(response);
// })
// .catch((error)=>{
//     console.log(error);
// })


