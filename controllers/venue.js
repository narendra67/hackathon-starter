const Venue = require("../models/Venue");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});
// console.log(Date.now());
var upload = multer({ storage: storage }).array('file');

exports.createVenueForm = (req, res) => {
    // console.log(req.body);


    // setInterval(function(){
    //     console.log(req.body)
    // }, 100)
    console.log("consoling the request")
    console.log(req.body)

        upload(req, res, function (err) {
            // console.log("inside upload");
            // console.log(req.files[0].filename);
            if (err) {
                // An error occurred when uploading
                return res.json({
                    err: err

                })
            }
            req.checkBody("email", "Enter a valid email address.").isEmail();
            req.checkBody("phone","enter a valid mobile number").isMobilePhone("en-IN");
            var errors = req.validationErrors();
            if (errors) {
                res.send(errors);
                return;
            } else {
                // normal processing here
                console.log("consoling the request")
                console.log(req.body)
            Venue.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                description: req.body.description,
                sports: [],
                // photos:[{path:"./uploads/"+req.files[0].filename}]
            }, function (err, venue) {
                if (err) {
                    console.log(err)
                    return res.json({err: err})
                } else {
                    console.log(venue);
                    res.json(venue);
                }
            })

            // res.json({
            //     success: true,
            //     message: "Image Uploaded"
            // })
        }
    });
};


exports.showVenue = (req, res) =>{
  Venue.find({}, function(err, venue){
      if(err){res.send("error showing venues")}else{
          res.json({values: venue});
      }
  })
};

exports.updateVenue = (req, res) => {
    Venue.findOneAndUpdate(req.params.id, req.body,{new: true}, function(err, venue){
        if(err){res.send("cannot update")}else{
            res.json(venue);
        }
    } )
};

exports.deleteVenue = (req, res) => {
    Venue.deleteOne(req.params.id, function(err, venue){
        if(err){res.send("cannot update")}else{
            res.json(venue);
        }
    } )
};

exports.addVenueSport = (req, res) => {
    Venue.findById(req.params.id, function (err, venuesport) {
      if(err){res.json(err)}else{
          venuesport.sports= venuesport.sports.concat(req.body.sports)
          venuesport.save(function(err, sport){
              if(err){res.json(err)}else{
                  res.json(sport);
              }
          })
      }
    })
}

exports.updateVenueSport = (req, res) => {
    Venue.findById(req.params.id, function(err, venuesport){
        if(err){res.json(err)}else {
            console.log(req.body)
            var s = venuesport.sports.id(req.params.ids)
            s.set(req.body.sports[0])

            venuesport.save(function (err, savedsport) {
                if (err) {
                    res.send(err)
                } else {
                    res.send(savedsport);
                }
            })
        }
    })
}

exports.addVenueComments = (req, res) => {
    console.log(req.body);
    Venue.findById(req.params.id, function(err, comment){
        if(err){res.json(err)}else{
            comment.reviews.push({"rating":req.body.rating, "description":req.body.description})
            comment.save(function(err, com){
                if(err){res.json(err)}else{
                    res.json(com)
                }
            })
        }
    })
}

