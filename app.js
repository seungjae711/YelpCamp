var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

campgrounds =[
    {name:"camp1", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
    {name:"camp2", image:"https://typewriter.imgix.net/u/54915065-8596-4c29-bb7a-e6320dbb9698/p/35470/tour-camp-highlander-summer-camp-for-boys-and-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&w=1000"},
    {name:"camp3", image:"https://www.asiliaafrica.com/wp-content/uploads/2018/07/Olakira-Star-gazing-tent-under-the-milkyway.jpg"},
    {name:"camp1", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
    {name:"camp2", image:"https://typewriter.imgix.net/u/54915065-8596-4c29-bb7a-e6320dbb9698/p/35470/tour-camp-highlander-summer-camp-for-boys-and-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&w=1000"},
    {name:"camp3", image:"https://www.asiliaafrica.com/wp-content/uploads/2018/07/Olakira-Star-gazing-tent-under-the-milkyway.jpg"},
    {name:"camp1", image:"http://www.sapminature.com/wp-content/uploads/2018/01/SapmiNatureCamp-3.jpg"},
    {name:"camp2", image:"https://typewriter.imgix.net/u/54915065-8596-4c29-bb7a-e6320dbb9698/p/35470/tour-camp-highlander-summer-camp-for-boys-and-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&w=1000"},
    {name:"camp3", image:"https://www.asiliaafrica.com/wp-content/uploads/2018/07/Olakira-Star-gazing-tent-under-the-milkyway.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //console.log(campgrounds);
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("YelpCamp server has started!!!");
})
