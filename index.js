//This is the primary backend file.
//All other backend files are within the "backend-files" folder
//See "Things to remember" if the app is not working for you
//-------------------------------------------------------------------------------------//

//Required imports
const express = require("express");
const app = express();
const path = require("path");

//Establishes a variable "client" with the database connection info
//Login information is in Secret.js, which is in the .gitignore so it must be locally created on each machine
let MongoClient = require("mongodb").MongoClient;
let getSecret = require("./Secret");
let client = new MongoClient(getSecret("uri"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Routes to each page's respective backend file, does not need .js for the file
//Any strange formatting for these is due to the Prettier extension
app.use("/api/clients_page", require("./routes/Clients Page/Clients_Main"));
app.use("/api/home_page", require("./routes/Home Page/Home_Main"));
app.use(
  "/api/integrations_page",
  require("./routes/Integrations Page/Integrations_Main")
);
app.use("/api/orders_page", require("./routes/Orders Page/Orders_Main"));
app.use("/api/reports_page", require("./routes/Reports Page/Reports_Main"));

//All are needed to prevent crashing on page refresh, this is also what serves the frontend to the browser
app.set("views", path.join(__dirname, "views"));
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  //our GET route needs to point to the index.html in our build
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//Sets the port of the app to whatever the host is using, or 3000 for local development
app.set("port", process.env.PORT || 3000);

//Connect to database and start the app
client.connect((err, database) => {
  if (err) {
    console.log(err);
  }

  //Allows for database operation in other files without starting a whole new connection every time
  app.set("db", database);

  app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
  });
});

//This line is apparently not required, but I'll leave it here in case stuff starts to break
module.exports = app;
