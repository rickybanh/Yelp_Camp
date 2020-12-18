var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://cdn.pixabay.com/photo/2018/10/28/16/58/lake-3779280_960_720.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Sky's Rest",
        image: "https://cdn.pixabay.com/photo/2018/10/28/16/58/lake-3779280_960_720.jpg",
        description: "Blah blah blah"
    },
    {
        name: "Fool's Rest",
        image: "https://cdn.pixabay.com/photo/2018/10/28/16/58/lake-3779280_960_720.jpg",
        description: "Blah blah blah"
    },
    ];

function seedDB(){
    // remove campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }
            else{
                console.log("added a campground");
                // create a comment
                Comment.create(
                    {
                        text: "This place sucks!",
                        author: "Homer Simpson"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment")
                            
                        }
                    });
                }
            });
        });
        
    });
    // add a few sample comments
}

module.exports = seedDB;