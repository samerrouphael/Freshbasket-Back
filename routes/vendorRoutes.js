const express = require("express");
const router = express.Router();

const{
    addVendor,
    getAllVendors,
    getVendorByNameAndLastName,
    deleteVendorById,
    updateVendorByEmail,
    vendorLogin,
    getVendorNameByEmail,
    getVendorByEmail,
    updateVendorById

}= require("../controllers/vendorController");

router.post("/addVendor", addVendor);
router.get("/getAllVendors", getAllVendors);
router.get("/getVendorByNameAndLastName/:name/:lastName", getVendorByNameAndLastName);
router.delete("/deleteVendorById/:id", deleteVendorById);
router.put("/updateVendorByEmail/:email", updateVendorByEmail);
router.put("/updateVendorById/:id", updateVendorById);
router.get("/getVendorNameByEmail/:email", getVendorNameByEmail);
router.get("/getVendorByEmail/:email", getVendorByEmail);
router.post('/vendorLogin', vendorLogin);
module.exports = router;