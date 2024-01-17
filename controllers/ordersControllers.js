const Orders = require("../models/Orders");

module.exports = {
    getUserOrders: async (req, res) => {
        const userId = req.user.id;
        try {
            const userOrders = await Orders.find({ userId })
                .populate({
                    path: 'productId',
                    select: '-sizes -oldPrice -description -category'
                }).exec();
            res.status(200).json(userOrders)
        } catch (error) {
            res.status(500).json({ message: "Failed to get orders" })
        }
    },
    addUserOrders: async (req, res) => {
        const { userId, productId, quantity, subtotal,  payment_status, total } = req.body;

        try {
            // Create a new order
            const newOrder = new Orders({
                userId,
                productId,
                quantity,
                subtotal,
                payment_status: 'unpaid',
                total
            });

            // Save the new order to the database
            const savedOrder = await newOrder.save();

            res.status(201).json(savedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to add order" });
        }
    },
    deleteUserOrders: async (req, res) => {
        const orderId = req.params.orderId; // Assuming orderId is part of the route parameters

        try {
            // Find the order by orderId and delete it
            const deletedOrder = await Orders.findByIdAndDelete(orderId);

            if (deletedOrder) {
                res.status(200).json({ message: "Order deleted successfully" });
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete order" });
        }
    }
}