const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//Recieves HTTP POST requests at http://localhost:3000/api/login_page/signup
//Used for adding users to the database
router.post("/signup", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const users = req.app.get("db").db("itventory").collection("Users");

  //hashing a password before saving it to the database
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) throw err;
    password = hash;

    //Once hased, post the user information to the database
    let response = await users.insertOne({
      username: username,
      password: password,
    });
    res.json(response);
  });
  //on the front-end file, if the response is 200, consider the user logged in
});

//Recieves HTTP POST requests at http://localhost:3000/api/login_page/login
//Used for logging users in
router.post("/login", async (req, res) => {
  const users = req.app.get("db").db("itventory").collection("Users");
  let username = req.body.username;
  let password = req.body.password;

  //Get user information from db
  let user = await users.findOne({ username: username });

  //Store the _id from MongoDB into the sessionID so we can keep the user logged in
  req.session.userId = user._id;

  //Make sure it's correct
  bcrypt.compare(password, user.password, (err, result) => {
    res.json({
      status: result,
    });
  });
});

module.exports = router;