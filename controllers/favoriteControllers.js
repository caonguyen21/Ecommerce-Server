const Favorite = require('../models/Favorite'); // Assuming the model is in the correct file path

// Add a new favorite
const addFavorite = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {
        let favorite = await Favorite.findOne({ userId });

        if (!favorite) {
            favorite = new Favorite({
                userId,
                products: [],
            });
        }

        // Check if the product already exists in favorites
        const existingProduct = favorite.products.find((product) => product.favItem.toString() === productId);

        if (existingProduct) {
            return res.status(400).json({ error: "Product already in favorites" });
        }

        favorite.products.push({ favItem: productId });
        await favorite.save();

        res.status(200).json({ message: "Product added to favorites", favorite });
    } catch (error) {
        console.error("Error adding to favorites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addFavorite };


// Get all favorites for a user
const getFavorites = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const favorite = await Favorite.findOne({ userId }).populate('products.favItem');

        if (!favorite) {
            return res.status(404).json({ message: "Favorites not found" });
        }

        res.status(200).json(favorite);
    } catch (error) {
        console.error("Error getting favorites:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getFavorites };

const deleteFavtItem = async (req, res) => {
    const favItemId = req.params.favItemId;
  
    try {
      const updatedFav = await Favorite.findOneAndUpdate(
        { 'products.favItem': favItemId },
        { $pull: { 'products': { 'favItem': favItemId } } },
        { new: true }
      );
  
      if (!updatedFav) {
        return res.status(404).json({ message: "Favorite item not found" });
      }
  
      res.status(200).json(updatedFav);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { deleteFavtItem };

module.exports = {
    addFavorite,
    getFavorites,
    deleteFavtItem,
};
