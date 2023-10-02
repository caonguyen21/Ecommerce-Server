const User = require('../models/User')

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            const { password, __v, updatedAt, createdAt, ...userData } = user._doc;

            res.status(200).json(userData)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    detele: async (req, res) => {
        try {
            await User.findById(req.user.id)
            res.status(200).json("User successfully deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}