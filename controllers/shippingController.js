const Shipping = require("../models/shipping");

const addShipping = async (req, res) => {
  try {
    const shipping = new Shipping({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNUmber: req.body.phoneNUmber,
      country: req.body.country,
      cityName: req.body.cityName,
      postalCode: req.body.postalCode,
      streetAddress: req.body.streetAddress,
      totalPrice: req.body.totalPrice,
     
      status: req.body.status,
    });

    const saveShipping = await shipping.save();
    res.status(200).json({
      code: 200,
      message: "Shipping added successfully",
      data: saveShipping,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Shipping was not added successfully",
      error: error.message,
    });
  }
};
const getAllShippingOrders = async (req, res) => {
  try {
    const data = await Shipping.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
const deleteShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShipping = await Shipping.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Shipping deleted successfully",
      projects: deletedShipping,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the Shipping",
      error: error,
    });
  }
};

async function cancelShipping(shippingId) {
  try {
    const updatedShipping = await Shipping.findByIdAndUpdate(
      shippingId,
      { $set: { status: 'cancel' } },
      { new: true } // To get the updated record after the update operation
    );

    if (!updatedShipping) {
      throw new Error('Shipping record not found');
    }

    return updatedShipping;
  } catch (error) {
    throw new Error(`Failed to update shipping status: ${error.message}`);
  }
}
module.exports = {
  addShipping,
  getAllShippingOrders,
  deleteShippingById,
  cancelShipping
}