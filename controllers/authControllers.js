const User = require("../models/User");

const CrtptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CrtptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            location: req.body.locationm,
        });
        try {
            await newUser.save();
            res.status(201).json({ message: "User successfully created" })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            !user && res.status(401).json("Could not find the user")
            const decryptedpass = CrtptoJS.AES.decrypt(user.password, process.env.SECRET);
            const thepasswork = decryptedpass.toString(CrtptoJS.enc.Utf8)
            thepasswork !== req.body.password && res.status(401).json("Wrong passwork")
            const userToken = jwt.sign({
                id: user._id
            }, process.env.JWT_SEC, { expiresIn: "21d" });
            const { password, __v, updatedAt, createdAt, ...others } = user._doc;
            res.status(200).json({ ...others, token: userToken })
        } catch (error) {
            res.status(200).json("failed to login check info again")
        }
    }
}