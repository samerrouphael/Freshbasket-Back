const mongoose = require('mongoose');

const orderDetail = new mongoose.Schema({
    email: { type: String},
    productsId: {type :[String]},
    date: { type: String},
    totalPrice: { type: Number},
    status:{ type: String}
  });
  
const OrderDetail = mongoose.model('OrderDetail', orderDetail);
  
  module.exports = OrderDetail ;