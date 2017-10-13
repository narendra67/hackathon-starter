const Sport = require('../models/Sport');

exports.createSportForm = (req,res)=> {
    res.render("sports/create");
};

exports.createSport = (req, res, next) => {
    const sport = new Sport({
        name : req.body.name,
        type : req.body.type
    });
    Sport.findOne({name: req.body.name}, (err, existingSport) => {
        if(err){return next(err);}
        if(existingSport){
            req.flash("errors", {msg: 'This account already exists.'});
            return res.redirect('/create');
        }
        sport.save((err) =>{
           if(err){return next(err);}
           res.redirect('/create');
        });
    })
};

exports.createSports = (req,res) => {
    for(var i=1; i<=10; i++){
        const sport = new Sport({
            name: "cricket"+i,
            type: "outdoor"
        });
        sport.save((err)=>{
            if(err){return next(err);}

        })
    }
    res.redirect('/create');
};

//Chrome Extension
exports.createExtension = (req,res,next) => {
    // console.log(name,type);
    const sport = new Sport({
        name: req.body.name,
        type: req.body.type
    });
    sport.save((err) =>{
        if(err){return next(err);}
        res.send("json");
    });
};

exports.showSports = (req, res) => {
    Sport.find({}, function(err, allSports){
        if(err){req.flash('errors', {msg: "Unable to find all sports"});}
        res.render('sports/list', {allSports: allSports});
    })
};

exports.showSport = (req, res) => {
    Sport.findOne({name: req.params.name}, function(err, sport){
        if(err){req.flash('errors', {msg: 'The sport you are looking for is not found...!!! TRY AGAIN !!!'})}
        res.render("sports/sport", {sport: sport});
    })
}