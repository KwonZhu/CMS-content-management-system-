const { Schema, model } = require('mongoose');
const schema = new Schema({
  firstName: { 
    type: String,
    require: true,
    trim: true, //delete extra spaces
    minlength: 2
  },
  lastName: { 
    type: String,
    require: true,
    trim: true
  },
  email: { 
    type: String,
    require: true
  },
  // course: {
  //   type: String
  // }
});
module.exports = model('Student', schema);