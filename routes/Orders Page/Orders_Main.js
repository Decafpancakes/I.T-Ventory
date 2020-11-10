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

//Recieves HTTP GET requests at http://localhost:3000/api/orders_page/getClientOrders
//For populating Client Order Table
router.get("/getClientOrders", async (req, res) => {
  //Establish a database connection
  const clientOrders = req.app.get("db").db("itventory").collection("Client Orders");

  let documents = await clientOrders.find({}).toArray();

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
    orderNumber: req.body.orderNumber,
    notes: req.body.notes,
    rush: req.body.rush,
  });

  res.json(response);
});

//Recieves HTTP POST requests at http://localhost:3000/api/orders_page/update
//For removing stock from an asset when an item is allocated
router.post("/update", async (req, res) => {
  //Establish a database connection
  const assets = req.app.get("db").db("itventory").collection("Assets");

  let document = await assets.find({ item: req.body.item }).toArray();
  let newValue = document[0].stock - req.body.allocated;
  let result = await assets.updateOne(
    { item: req.body.item },
    { $set: { stock: newValue.toString() } }
  );

  res.json(result);
});

module.exports = router;
