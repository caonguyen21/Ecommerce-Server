const req = require('express/lib/request');
const Product = require('../models/Product'); // Assuming your schema is in the 'models' folder

module.exports = {
    createProduct: async (req, res) => {
        try {
            const newProduct = req.body; // Assuming the request body contains the product data
            const product = await Product.create(newProduct);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json("Failed to create products");
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({createdAt: -1})
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("Failed to get products");
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json('Product not found');
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const updatedProduct = req.body;
        try {
            const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
            res.status(200).json({ success: true, product });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    searchProducts: async (req, res) => {
        try {
            const products = await Product.aggregate([
                {
                    $search: {
                        index: 'shoes',
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: '*'
                            }
                        }
                    }
                }
            ]);

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("failed to search product");
        }
    },
    addComment: async (req, res) => {
        const { productId, text } = req.body;
        const userId = req.user.id;

        try {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            const newComment = {
                user: userId,
                text,
            };

            product.comments.push(newComment);
            await product.save();

            res.status(201).json({ success: true, comment: newComment });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
}
