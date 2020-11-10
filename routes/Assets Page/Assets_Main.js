//Needs to be in all files
const express = require("express");
const router = express.Router();

//Recieves HTTP POST requests at http://localhost:3000/api/assets_page/post
router.post("/post", (req, res) => {
  //const db = req.app.get('db');
  const assets = req.app.get("db").db("itventory").collection("Assets");

  assets.insertOne(
    {
      item: req.body.item,
      modelNumber: req.body.modelNumber,
      manufacturer: req.body.manufacturer,
      vendor: req.body.vendor,
      cost: req.body.cost,
      sellPrice: req.body.sellPrice,
      stock: req.body.stock,
      allocated: "0",
    },
    (err, res) => {
      if (err) throw err;
      console.log(res);
    }
  );

  res.json({
    status: 200,
  });
});

//Recieves HTTP GET requests at http://localhost:3000/api/assets_page/get
router.get("/get", async (req, res) => {
  const assets = req.app.get("db").db("itventory").collection("Assets");

  let documents = await assets.find({}).toArray();

  res.json(documents);
});

//Recieves HTTP POST requests at http://localhost:3000/api/assets_page/update
router.post("/update", async (req, res) => {
  const assets = req.app.get("db").db("itventory").collection("Assets");

  let response = await assets.updateOne(
    { item: req.body.item },
    {
      $set: {
        [req.body.infoToUpdate]: req.body.valueToUpdateWith,
      },
    }
  );
  res.json({
    status: 200,
  });
});

//Recieves HTTP POST requests at http://localhost:3000/api/assets_page/delete
router.post("/delete", async (req, res) => {
  const assets = req.app.get("db").db("itventory").collection("Assets");

  let documents = await assets.deleteOne({ item: req.body.item });
  res.json({
    message: "woo",
  });
});

//DO NOT EVER FORGET THIS LINE
//OTHERWISE YOU WILL GET ERROR MESSAGES ABOUT MISSING MIDDLEWARE
module.exports = router;
