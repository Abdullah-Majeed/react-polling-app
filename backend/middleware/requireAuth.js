const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const requireAuth = async (req, res, next) => {
    
    // GET AUTHORIZATION JWT TOKEN FROM FRONTEND
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({ error: 'Autorization token is required' })
    }

    const token = authorization.split(' ')[1];
    try {

        // VERIFY TOKEN WITH HELP OF SECRET KEY
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);

        // FIND USER FROM DATABASE
        req.user = await User.findOne({ _id }).select('_id');

        // NOW ALLOW USER TO CALL AUTHENTICATED APIS 
        next();
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }

}
module.exports = requireAuth