 const { Schema, model } = require('mongoose');
 
const authorSchema = new Schema(
  {
    name: String, 
    image_url: String, 
    hometown: String, 
    birthday: String,
  },
  {
    timestamps: true
  }
);
 
module.exports = model('Author', authorSchema);