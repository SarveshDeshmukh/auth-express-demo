var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMangoose = require("passport-local-mongoose"),
    app                   = express(),
    User                  = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useMongoClient : true});

app.use(require("express-session")({
    secret: "Arsenal is the best club",
    resave : false,
    saveUninitialized: false
})); 

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session);

passport.serializeUser(User.serializeUser());
passport.deSerialized(User.deserializedUser());


app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});
