const Admin= require("../models/admin");

const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.params;
      const admin = await Admin.find({ email, password });
  
      if (admin.length > 0) {
        res.json(admin);
      } else {
        res.status(404).json({ message: 'admin not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const addAdmin = async (req, res) => {
    try {
      const admin = new Admin({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
      });
      const savedAdmin = await admin.save(); 
      res.status(200).json({
        code: 200,
        message: 'Admin added successfully',
        data: savedAdmin 
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        message: 'Admin was not added',
        error: error.message
      });
    }
  };
  const getAdminByEmailAndPassword = async (req, res) => {
    try {
      const { email, password } = req.params;
      const admins = await Admin.find({ email, password });
  
      if (admins.length > 0) {
        res.json(admins);
      } else {
        res.status(404).json({ message: 'admins not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    adminLogin,
    addAdmin,
    getAdminByEmailAndPassword
}