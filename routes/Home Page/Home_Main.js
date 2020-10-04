//Needs to be in all files
const express = require('express');
const router = express.Router();

//Recieves HTTP requests at http://localhost:3000/api/home_page/getBarChartData
router.get('/getBarChartData', async (req, res) => {
    //Establishes a usable, but not active, connection to the "Client Orders" collection
    var db = req.app.get('db');
    let client_orders = db.db("itventory").collection("Client Orders");

    //Most of these calls will be inside of a try-catch block to handle any errors
    try {
        let documents = await client_orders.find({}).toArray();
        res.json(documents);
    } catch (error) {
        res.json({
            error: error
        });
    }
});

//Recieves HTTP requests at http://localhost:3000/api/home_page/getTableData
router.get('/getTableData', async (req, res) => {
    var db = req.app.get('db');
    let assets = db.db("itventory").collection("Assets");

    try {
        let documents = await assets.find({}).toArray();
        res.json(documents);
    } catch (error) {
        res.json({
            error: error
        });
    }
});


//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;