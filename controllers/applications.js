var express = require('express');
var router = express.Router();

// add model ref
const User = require('../models/user')
const Application = require('../models/application')

const passport = require('passport')

// auth check
function authCheck(req, res, next) {
    // use express built-in method to check for user identity.  if a user is found, continue to the next method
    if (req.isAuthenticated()) {
        return next()
    }

    // if no user found, go to login
    res.redirect('/login')
}



router.get('/',((req, res) => {

    Application.find({'owner':req.user},(err, applications) => {
        if(err){
            res.end(err)
        }else {
            res.render('applications/index', {
                applications: applications,
                title: 'Application',
                user: req.user
            })
        }





    })}))





router.get('/create', authCheck, (req, res) => {



    res.render('applications/create', {
        title: 'Add a New Applications',
        user: req.user,




    })

})

router.post('/create', authCheck,(req, res) => {
    // use Mongoose model to create a new Artist document
    Application.create({
        postDate: req.body.postDate,
        applyDate: req.body.applyDate,
        applyDeadline: req.body.applyDeadline,
        company: req.body.company,
        jobPosition: req.body.applyDeadline,


        owner:req.user
    }, (err, newApplication) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else { // save successful; update artists list view
            res.redirect('/applications')
        }
    })
})





// make public
module.exports = router