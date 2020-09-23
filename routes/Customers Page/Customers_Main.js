//Needs to be in all files
const express = require('express');
const router = express.Router();

//Recieves HTTP requests at http://localhost:3000/api/customers_page
router.get('/', async (req, res, next) => {
    const db = req.app.get('db');
    let test = await db.db("itventory").collection("test").findOne({});
    res.json(test.test);
});

//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;