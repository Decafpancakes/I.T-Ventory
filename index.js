//This is the primary backend file.
//All other backend files are within the "backend-files" folder
//See "Things to remember" if the app is not working for you
const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);

var MongoClient = require('mongodb').MongoClient;
var getSecret = require("./routes/Secret")
var client = new MongoClient(getSecret("uri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//This will allow the frontend files to be displayed and handle view routing
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('./client/build'));

//Connect to database and start the app
client.connect((err, database) => {
    if (err) {
        console.log(err);
    }

    //Allows for database operation in other files without starting a whole new connection every time
    app.set('database', database);

    app.listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'));
    });
});

module.exports = app;