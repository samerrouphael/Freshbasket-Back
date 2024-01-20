const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    phoneNUmber: { type: Number},
    country: { type: String},
    cityName: { type: String},
    postalCode: { type: Number},
    streetAddress: { type: String},
    totalPrice: { type: Number},
    date:{type: String},
    status: {type:String}
  });
  
const Shipping = mongoose.model('Shipping', shippingSchema);
  
  module.exports = Shipping ;