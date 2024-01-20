const express = require("express");
const router = express.Router();


const{
    addClient,
    getAllClients,
    deleteClientById,
    clientLogin,
    getClientByEmail,
    updateClientById

}= require("../controllers/clientController");

router.post("/addClient", addClient);
router.get("/getAllClients", getAllClients);
router.delete("/deleteClientById/:id", deleteClientById);
router.get("/getClientByEmail/:email", getClientByEmail);
router.put("/updateClientById/:id", updateClientById);
router.post('/clientLogin', clientLogin);
module.exports = router;