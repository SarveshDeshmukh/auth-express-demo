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
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===========
//ROUTES
//===========
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret"); 
});

//Auth routes

//Show sign up form
app.get("/register", function(req, res){
    res.render("register");
})

//Handling user sign up
app.post("/register", function(req, res){
    console.log("User name is "+ req.body.username);
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if(err){
           console.log(err);
       }
           passport.authenticate("local")(req, res, function(){
               res.redirect("/secret");
           });
       
   }); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});
