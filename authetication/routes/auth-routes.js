const express = require('express');
const {registerUser,loginUser} = require('../controllers/authcontroller')
const router  = express.Router();

//all routes are realted to auteation 
router.post('/register',registerUser);
router.post('/login',loginUser);


module.exports = router