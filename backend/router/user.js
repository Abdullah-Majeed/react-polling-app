const express = require('express');

const { loginUser, signupUser } = require("../controller/userController");

const router = express.Router();

// LOGIN ROUTE
router.post('/login', loginUser);

// SINGUP ROUTE
router.post('/signup', signupUser);

module.exports = router;