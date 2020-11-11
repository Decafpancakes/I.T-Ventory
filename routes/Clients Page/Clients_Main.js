//Needs to be in all files
const express = require("express");
const router = express.Router();

//Recieves HTTP GET requests at http://localhost:3000/api/clients_page/clientInfo
//Used to get all client data
router.get("/clientInfo", async (req, res) => {
  //Establish a database connection
  const clients = req.app.get("db").db("itventory").collection("Clients");

  let documents = await clients.find({}).toArray();
  console.log(documents);
  res.json(documents);
});

//Recieves HTTP POST requests at http://localhost:3000/api/clients_page/postInfo
//Used to get all client data
router.post("/postInfo", async (req, res) => {
  //Establish a database connection
  const clients = req.app.get("db").db("itventory").collection("Clients");

  let response = await clients.insertOne({
    client: req.body.client,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    po: req.body.po,
  });
  res.json(response);
});

//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;
