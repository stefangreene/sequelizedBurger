var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");

var PORT =  process.env.PORT || 3002;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
//app.use(express.static("public"));
//app.use(path.join(__dirname,"public"));
app.use(express.static(path.join(__dirname,"public")));

//...........Parse application body as JSON................
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//...........set handlebars.................................
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controller/burgerControl.js");

app.use(routes);

//.......Start our server listener...........................

app.listen(PORT, function(){
// Log (server-side) when our server has started
console.log("This ap is listening at the http://localhost:" + PORT);
});