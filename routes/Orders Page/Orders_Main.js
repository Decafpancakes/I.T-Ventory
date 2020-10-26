//Needs to be in all files
const express = require("express");
const router = express.Router();

//Recieves HTTP GET requests at http://localhost:3000/api/orders_page
router.get("/", async (req, res) => {
    //Establish a database connection
    const db = req.app.get("db");
    const client_orders = db.db("itventory").collection("Client Orders");
  
    try {
      //Pull documents from database based on "Client Name" text box
      let documents = await client_orders.find({}).toArray();
      res.json(documents);
    } catch (error) {
      //Return an error
      res.json({
        error: error,
      });
    }
  });
//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;
