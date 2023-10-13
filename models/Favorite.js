const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [{
        favItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
    }
    ]
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
