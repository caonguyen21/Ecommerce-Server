const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
    addCart: async (req, res) => {
        const userId = req.user.id;
        const { cartItem, quantity, action, size } = req.body;
        try {
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({
                    userId,
                    products: [],
                });
            }

            if (action === 'increment') {
                incrementQuantity(cart, cartItem, size);
            } else if (action === 'decrement') {
                decrementQuantity(cart, cartItem, size);
            }

            await cart.save();
            res.status(200).json({ message: "Quantity updated", cart });
        } catch (error) {
            console.error("Error updating quantity:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getCart: async (req, res) => {
        const userId = req.user.id;
        try {
            const cart = await Cart.find({ userId })
                .populate('products.cartItem', "_id name imageUrl price category");
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteCartItem: async (req, res) => {
        const cartItemId = req.params.cartItem;
        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { 'products._id': cartItemId },
                { $pull: { products: { _id: cartItemId } } },
                { new: true }
            );

            if (!updatedCart) {
                return res.status(404).json({ message: "Cart item not found" })
            }
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

const incrementQuantity = (cart, cartItem, size) => {
    const existingProduct = cart.products.find(
        product => product.cartItem.toString() === cartItem
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ cartItem, quantity: 1, size });
    }
};

const decrementQuantity = (cart, cartItem) => {
    const existingProduct = cart.products.find(
        product => product.cartItem.toString() === cartItem
    );

    if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
    } else {
        // Remove the product from the cart or handle any other behavior
        cart.products = cart.products.filter(product => product.cartItem.toString() !== cartItem);
    }
};
