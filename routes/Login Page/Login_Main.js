const express = require("express");
const router = express.Router();

//Recieves HTTP POST requests at http://localhost:3000/api/login_page/login
router.post("/login", (req,res)=>{
    let username = "reece"/* req.body.username */;
    let password = "reece"/* req.body.password */;

    const admin = req.app.get("db").db("admin");

    let response = admin.auth(username, password);
    console.log(response);


    res.json(response);
    //on the front-end file, if the response is 200, consider the user logged in
});

module.exports = router;