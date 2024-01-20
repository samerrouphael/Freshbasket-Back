const express = require("express");
const router = express.Router();

const {
    addShipping,
    getAllShippingOrders,
    deleteShippingById,
    cancelShipping
  }= require("../controllers/shippingController");

  router.post("/addShipping", addShipping);
  router.delete("/deleteShippingById/:id", deleteShippingById);
  router.get("/getAllShippingOrders", getAllShippingOrders);
  router.put("/cancelShipping", cancelShipping);
  module.exports = router;