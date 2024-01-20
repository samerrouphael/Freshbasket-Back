const express = require("express");
const router = express.Router();
 
const{
    addOrderDetail,
    getAllOrders,
    getOrderByClientEmail,
    updateProductStatus,
    deleteorderDetailById,
    updateOrderDetailById,
    cancelOrder

}=require("../controllers/orderDetailController");


router.post("/addOrderDetail", addOrderDetail);
router.get("/getAllOrders", getAllOrders);
router.get("/getOrderByClientEmail/:email", getOrderByClientEmail);
router.put("/updateProductStatus/:id", updateProductStatus);
router.delete("/deleteorderDetailById/:id", deleteorderDetailById);
router.put("/updateOrderDetailById/:id", updateOrderDetailById);
router.put("/cancelOrder/:id", cancelOrder);
module.exports = router;