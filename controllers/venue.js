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
    console.log(req.body);


    // setInterval(function(){
    //     console.log(req.body)
    // }, 100)


        upload(req, res, function (err) {
            console.log("inside upload");
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
            Venue.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                description: req.body.description,
                sports: [{name: "cricket"}, {name: "football"}],
                // photos:[{name:req.files.upload.name, path:req.files.upload.path}]
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

//
// exports.upload =(req,res)=>{
//     Venue.create({
//         photos:[{name:req.files.upload.name, path:req.files.upload.path}]
//     })
// }

exports.showVenue = (req, res) =>{
  Venue.find({}, function(err, venue){
      if(err){res.send("error showing venues")}else{
          res.json(venue);
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