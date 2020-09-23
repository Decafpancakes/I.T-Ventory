//This is the primary backend file.
//All other backend files are within the "backend-files" folder
//See "Things to remember" if the app is not working for you
//-------------------------------------------------------------------------------------//

//Required imports
const express = require('express');
const app = express();

//Sets the port of the app to whatever the host is using, or 3000 for local development
app.set('port', process.env.PORT || 3000);

//Establishes a variable "client" with the database connection info
//Login information is in Secret.js, which is in the .gitignore so it must be locally created on each machine
var MongoClient = require('mongodb').MongoClient;
var getSecret = require("./Secret");
var client = new MongoClient(getSecret("uri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//This will allow the frontend files to be displayed and handle frontend routing.
app.use(express.static('./client/build'));

//Routes to each page's respective backend file, does not need .js for the file
app.use('/api/customers_page', require('./routes/Customers Page/Customers_Main'));
app.use('/api/dashboard_page', require('./routes/Dashboard Page/Dashboard_Main'));
app.use('/api/integrations_page', require('./routes/Integrations Page/Integrations_Main'));
app.use('/api/orders_page', require('./routes/Orders Page/Orders_Main'));
app.use('/api/reports_page', require('./routes/Reports Page/Reports_Main'));

//Connect to database and start the app
client.connect((err, database) => {
    if (err) {
        console.log(err);
    }

    //Allows for database operation in other files without starting a whole new connection every time
    app.set('db', database);

    app.listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    });
});

//This line is apparently not required, but I'll leave it here in case stuff starts to break
//module.exports = app;,