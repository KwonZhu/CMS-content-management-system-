const { Schema, model } = require('mongoose');
const schema = new Schema({
  _id: { 
    type: String
  },
  name: { 
    type: String,
    required: true
  },
  course: {
    type: String
  }
});
module.exports = model('Student', schema);