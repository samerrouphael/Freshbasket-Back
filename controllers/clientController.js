const Client = require("../models/client");
const bcrypt = require("bcrypt");
//const { generateToken } = require("../extra/generateToken");

const addClient = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        code: 400,
        message: "Please provide all required fields.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new Client({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    const savedClient = await client.save();

    // Assuming generateToken generates a token using the saved client's information
    // const token = generateToken(savedClient.password, savedClient.email);

    res.status(200).json({
      code: 200,
      message: "Client added successfully",
      data: savedClient,
    });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({
      code: 500,
      message: "Client was not added successfully. Please try again later.",
    });
  }
};

const getAllClients = async (req, res) => {
  try {
    const data = await Client.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
      projects: deletedClient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the product",
      error: error,
    });
  }
};
const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Client.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: `User with email ${email} not found.`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: 'Wrong password.',
      });
    }

    // // Generate token using a secure method (not shown in your code)
    // const token = generateToken(user.email, user.password);

    return res.status(200).json({
      success: true,
      message: `User with email ${email} logged in successfully.`,
    
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to login.',
      error: error.message,
    });
  }
};
const getClientByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const clients = await Client.find({ email });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClientById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (updatedClient) {
      res.status(200).json({
        success: true,
        message: "Vendor updated successfully",
        vendor: updatedClient,
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
  addClient,
  getAllClients,
  deleteClientById,
  clientLogin,
  getClientByEmail,
  updateClientById,
};
