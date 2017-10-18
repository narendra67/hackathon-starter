const Venue = require("../models/Venue");
const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now()+'.jpg')
//     }
// });

// var upload = multer({ storage: storage }).single('file');

exports.createVenueForm = (req, res) => {
//
//     // const imagePath = req.files.upload.path;
//     // const imageName = req.files.upload.name;
//     upload(req, res, function (err) {
//         if (err) {
//             // An error occurred when uploading
//             return
//         }
//         res.json({
//             success: true,
//             message: "Image Uploaded"
//         })
//
//         // Everything went fine
//     });

        Venue.create({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.description,
            sports: [{name:"cricket"},{name:"football"}],
            // photos:[{name:req.files.upload.name, path:req.files.upload.path}]
        }, function(err, venue){
            if(err){console.log(err)}else{
                console.log(venue);

                res.json(venue);
            }
        })
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