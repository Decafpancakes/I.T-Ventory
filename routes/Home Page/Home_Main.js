//Needs to be in all files
const express = require("express");
const router = express.Router();

//Recieves HTTP GET requests at http://localhost:3000/api/home_page/getBarChartData
router.get("/getBarChartData", async (req, res) => {
  //Establishes a connection to the "Client Orders" collection
  const db = req.app.get("db");
  const client_orders = db.db("itventory").collection("Client Orders");

  let documents = await client_orders.find({}).toArray();
  //Send them to the front-end
  res.json(documents);
});

//Recieves HTTP GET requests at http://localhost:3000/api/home_page/getTableData
router.get("/getTableData", async (req, res) => {
  //Establishes a connection to the "Assets" collection
  var db = req.app.get("db");
  let assets = db.db("itventory").collection("Assets");

  try {
    //Pull all documents
    let documents = await assets.find({}).toArray();
    //Send them to the front-end
    res.json(documents);
  } catch (error) {
    //Send them an error
    res.json({
      error: error,
    });
  }
});

//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;
