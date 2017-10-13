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

exports.showSports = (req, res) => {
    Sport.find({}, function(err, allSports){
        if(err){req.flash('errors', {msg: "Unable to find all sports"});}
        res.render('sports/list', {allSports: allSports});
    })
};
