var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX route
router.get("/", function(req, res){
    // get campgrounds from the database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds:campgrounds});
});

//CREATE route
router.post("/", isLoggedIn, function(req,res){
   // get data from form and add to campgrounds array
   // redirect back to campground page
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author:author};
   // create a new campground and save to database desc
   Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } 
      else{
          res.redirect("/campgrounds");
      }
   });
});

//NEW route
router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW route = shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;