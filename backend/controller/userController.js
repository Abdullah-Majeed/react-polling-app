const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// METHOD TO CREATE JWT TOKEN
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

// LOGIN METHOD
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // CALL STATIC LOGIN METHOD 
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
// SIGNUP METHOD
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // CALL STATIC SIGNUP METHOD
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = { loginUser, signupUser }