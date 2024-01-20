require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser=require('body-parser');

const mongoose= require('mongoose');
const PORT = 8000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error',(error)=> console.error.bind(error , "Error when connceting to database"))
db.once('open' , ()=> console.log(" Connected to Database"))

const productRoute= require('./routes/productroutes')
const categoryRoute= require('./routes/categoriesroutes')
const adminRoute= require('./routes/adminroutes')
const clientRoute= require('./routes/clientroutes')
const orderDetail= require('./routes/orderDetailRoute')
const vendorRoute= require('./routes/vendorRoutes')
const shippingRoute= require('./routes/shippingRoutes')

app.use('/admin', adminRoute)
app.use('/Products', productRoute)
app.use('/category', categoryRoute)
app.use('/client', clientRoute)
app.use('/orderDetail', orderDetail)
app.use('/vendors', vendorRoute)
app.use('/shipping', shippingRoute)



 



