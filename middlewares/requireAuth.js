const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization 

    if (!token) {
        return res.status(401).json({ error: "You're not Authorized"})
    } 
    else {
        try {
            const {_id} = await jwt.verify(token.split(" ")[1], process.env.JWT_SEC)
            req.user = await User.findOne({ _id }).select("_id")
        } catch (error) {
            console.log("error", error)
            return res.status(400).json({ error: "You're not Authorized"})
        }
    }

    next()
}

module.exports = requireAuth