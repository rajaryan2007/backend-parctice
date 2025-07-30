const express = require('express');
const {registerUser,loginUser, changePassword} = require('../controllers/authcontroller')
const router  = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
//all routes are realted to auteation 
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/changepass',authMiddleware,changePassword);


module.exports = router