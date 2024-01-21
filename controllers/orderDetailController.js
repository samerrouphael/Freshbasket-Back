const OrderDetail = require("../models/orderDetail");

const addOrderDetail = async (req, res) => {
    try {
        const orderDetail = new OrderDetail({
            email: req.body.email,
            productsId: req.body.productsId,
            date: req.body.date,
            totalPrice: req.body.totalPrice,
            status: req.body.status,
            name:req.body.firstName,
           
        });

        const savedOrderDetails = await orderDetail.save();

        res.status(200).json({
            code: 200,
            message: 'Order Details added ',
            data: savedOrderDetails
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: 'Order Details was not added successfully',
            error: error.message
        });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const data = await OrderDetail.find({});
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const getOrderByClientEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const ordersDetail = await OrderDetail.find({ email });
        res.json(ordersDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateProductStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {

        const updatedProduct = await OrderDetail.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product status updated successfully' });
    } catch (error) {

        return res.status(500).json({ error: 'An error occurred while updating the product status' });
    }
};
const deleteorderDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrderDetail = await OrderDetail.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            projects: deletedOrderDetail,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error occurred while deleting the product",
            error: error,
        });
    }
};


const updateOrderDetailById = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters

        const updateorderDetail = await OrderDetail.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (updateorderDetail) {
            res.status(200).json({
                success: true,
                message: "Order updated successfully",
                vendor: updateorderDetail,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error occurred while updating the Order",
            error: error.message,
        });
    }
};
const cancelOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedShipping = await OrderDetail.findByIdAndUpdate(
            id,
            { $set: { status: 'cancel' } },
            { new: true }
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
    addOrderDetail,
    getAllOrders,
    getOrderByClientEmail,
    updateProductStatus,
    deleteorderDetailById,
    updateOrderDetailById,
    cancelOrder
} 