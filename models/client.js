const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String },
     lastName: { type: String },
     email: { type: String, unique: true },
     phone: {type : Number} ,
     password : {type :String},
     
    
   });
   const User = mongoose.model('user', userSchema);
  
   module.exports = User ;