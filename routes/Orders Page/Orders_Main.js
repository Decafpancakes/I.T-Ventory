//Needs to be in all files
const express = require("express");
const router = express.Router();

//Recieves HTTP GET requests at http://localhost:3000/api/orders_page/get
//For populating Order Table
router.get("/getAssets", async (req, res) => {
  //Establish a database connection
  const assets = req.app.get("db").db("itventory").collection("Assets");

  let documents = await assets.find({}).toArray();

  res.json(documents);
});

//Recieves HTTP GET requests at http://localhost:3000/api/orders_page/getOrderNumber
//For filling the order number text box
router.get("/getOrderNumber", async (req, res) => {
  //Establish a database connection
  const clientOrders = req.app
    .get("db")
    .db("itventory")
    .collection("Client Orders");

  let documents = await clientOrders
    .find({}, { projection: { _id: 0, orderNumber: 1 } })
    .sort({
      orderNumber: 1,
    })
    .toArray();

  res.json(documents);
});

//Recieves HTTP POST requests at http://localhost:3000/api/orders_page/post
//For inserting a client order
router.post("/post", async (req, res) => {
  //Establish a database connection
  const clientOrders = req.app
    .get("db")
    .db("itventory")
    .collection("Client Orders");

  let response = clientOrders.insertOne({
    item: req.body.item,
    allocated: req.body.allocated,
    clientName: req.body.clientName,
    technician: req.body.technician,
    orderNumber: req.body.orderNumber,
  });

  res.json(response);
});

//Recieves HTTP POST requests at http://localhost:3000/api/orders_page/update
//For removing stock from an asset when an item is allocated
router.post("/update", async (req, res) => {
  //Establish a database connection
  const assets = req.app.get("db").db("itventory").collection("Assets");
});

//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;
