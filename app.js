var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
// var Comment = require("./models/user");
var seedDB = require("./seeds")

seedDB();
// const url = "mongodb+srv://Sungjae:1234@cluster0-p3kg2.mongodb.net/YelpCamp?retryWrites=true&w=majority";
// mongoose.connect(url, { useNewUrlParser: true });

mongoose.connect("mongodb://localhost/YelpCamp_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Campground.create(
//     {
//         name: "camp1", 
//         image: "http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg",
//         description: "This is a huge granite hill, no bathrooms. No Water."
//     }, function(err, campground){
//         if(err) {
//             console.log(err);
//         }else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

// campgrounds =[
//     {name:"camp1", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
//     {name:"camp2", image:"https://typewriter.imgix.net/u/54915065-8596-4c29-bb7a-e6320dbb9698/p/35470/tour-camp-highlander-summer-camp-for-boys-and-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&w=1000"},
//     {name:"camp3", image:"https://www.asiliaafrica.com/wp-content/uploads/2018/07/Olakira-Star-gazing-tent-under-the-milkyway.jpg"},
//     {name:"camp1", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
//     {name:"camp2", image:"https://typewriter.imgix.net/u/54915065-8596-4c29-bb7a-e6320dbb9698/p/35470/tour-camp-highlander-summer-camp-for-boys-and-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&w=1000"},
//     {name:"camp3", image:"https://www.asiliaafrica.com/wp-content/uploads/2018/07/Olakira-Star-gazing-tent-under-the-milkyway.jpg"},
//     {name:"camp1", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
//     {name:"camp2", image:"https://typewriter.imgix.net/u/54915065-8596-4c29-bb7a-e6320dbb9698/p/35470/tour-camp-highlander-summer-camp-for-boys-and-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&w=1000"},
//     {name:"camp3", image:"https://www.asiliaafrica.com/wp-content/uploads/2018/07/Olakira-Star-gazing-tent-under-the-milkyway.jpg"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - Display a list of all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        }else {
            res.render("index", {campgrounds: allCampgrounds})
        }
    });
});


//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else {
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(3000, function(){
    console.log("YelpCamp server has started!!!");
})
