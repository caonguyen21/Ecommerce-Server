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
    }
}