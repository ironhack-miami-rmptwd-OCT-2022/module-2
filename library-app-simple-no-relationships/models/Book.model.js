 
const { Schema, model, Mongoose } = require('mongoose');
 
const bookSchema = new Schema(
  {
    title: {type: String},
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'Author' },
    rating: Number,
    image_url: String
  },
  {
    timestamps: true
  }
);
 
module.exports = model('Book', bookSchema);