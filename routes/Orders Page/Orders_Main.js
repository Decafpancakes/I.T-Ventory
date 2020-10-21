//Needs to be in all files
const express = require('express');
const router = express.Router();

//Recieves HTTP GET requests at http://localhost:3000/api/orders_page
router.get('/', (req, res) => {
    const db = req.app.get('db');
    res.json({
        "message": "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
    });
});

//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;