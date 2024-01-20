const express = require("express");
const router = express.Router();

const{
    adminLogin,
    addAdmin,
    getAdminByEmailAndPassword
}= require("../controllers/adminController");


router.get("/adminLogin", adminLogin);
router.post("/addAdmin", addAdmin);
router.get("/getAdminByEmailAndPassword/:email/:password", getAdminByEmailAndPassword);

module.exports = router;