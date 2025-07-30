const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  console.log("🏠 Hello, I'm from home");
  res.send("Welcome to the Home route!");
});

module.exports = router;
