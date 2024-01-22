const Vendor = require("../models/vendor");
const bcryptjs = require("bcryptjs");
//const { generateToken } = require("../extra/generateToken");

const addVendor = async (req, res) => {
  try {
    const { name, lastName, email, phone, company, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const vendor = new Vendor({
      name,
      lastName,
      email,
      phone,
      company,
      password: hashedPassword,
    });
    const savedVendor = await vendor.save();
    res.status(200).json({
      code: 200,
      message: "Vendor added successfully",
      data: savedVendor,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Vendor was not added successfully",
      error: error.message,
    });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const data = await Vendor.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getVendorByNameAndLastName = async (req, res) => {
  try {
    const { name, lastName } = req.params;
    const vendors = await Vendor.find({ name, lastName });

    if (vendors.length > 0) {
      res.json(vendors);
    } else {
      res
        .status(404)
        .json({
          message: "Vendors not found for the provided name and last name",
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVendor = await Vendor.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
      projects: deletedVendor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the product",
      error: error,
    });
  }
};
const updateVendorByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const updatedVendor = await Vendor.findOneAndUpdate(
      { email },
      { $set: req.body },
      { new: true }
    );

    if (updatedVendor) {
      res.status(200).json({
        success: true,
        message: "Vendor updated successfully",
        vendor: updatedVendor,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the vendor",
      error: error.message,
    });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res
        .status(404)
        .json({ message: "Vendor not found for the provided email" });
    }

    const passwordMatch = await bcryptjs.compare(password, vendor.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // const token = generateToken(vendor._id, vendor.role);
    res.status(200).json({
      message: "Vendor logged in successfully",
      data: {
        vendor: vendor.toObject(),
        //     token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendorNameByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const vendor = await Vendor.findOne({ email });

    if (vendor) {
      const { name, lastName } = vendor;
      res.json({ name, lastName, email });
    } else {
      res
        .status(404)
        .json({ message: "Vendor not found for the provided email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendorByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const vendors = await Vendor.find({ email });

    if (vendors.length > 0) {
      res.json(vendors);
    } else {
      res
        .status(404)
        .json({ message: "Vendors not found for the provided email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedVendor) {
      res.status(200).json({
        success: true,
        message: "Vendor updated successfully",
        vendor: updatedVendor,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the vendor",
      error: error.message,
    });
  }
};

module.exports = {
  addVendor,
  getAllVendors,
  getVendorByNameAndLastName,
  deleteVendorById,
  updateVendorByEmail,
  vendorLogin,
  getVendorNameByEmail,
  getVendorByEmail,
  updateVendorById,
};
