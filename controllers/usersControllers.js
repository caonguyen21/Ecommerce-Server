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
    },
    getUsernamesByIds: async (req, res) => {
        try {
            const objectIds = req.query.objectIds;
        
            if (!objectIds || objectIds.length === 0) {
              return res.status(400).json({ message: 'Please provide an array of object IDs.' });
            }
        
            // Convert string array of object IDs to actual ObjectId objects
            const objectIdArray = objectIds.map(id => mongoose.Types.ObjectId(id));
        
            const users = await User.find({ _id: { $in: objectIdArray } }, 'username');
        
            if (!users || users.length === 0) {
              return res.status(404).json({ message: 'No users found for the provided Object IDs.' });
            }
        
            const usernames = users.map(user => user.username);
        
            res.status(200).json({ usernames });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
    }
}