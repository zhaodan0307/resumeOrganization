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



router.get('/',authCheck,((req, res) => {

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
    // use Mongoose model to create a new Application document
    Application.create({
        postDate: req.body.postDate,
        applyDate: req.body.applyDate,
        applyDeadline: req.body.applyDeadline,
        startDay:req.body.startDay,
        company: req.body.company,
        position: req.body.position,
        type:req.body.type,
        location:req.body.location,
        qualification:req.body.qualification,
        term:req.body.term,
        duty:req.body.duty,
        salary:req.body.salary,
        experience:req.body.experience,
        education:req.body.education,
        owner:req.user
    }, (err, newApplication) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else { // save successful; update applications list view
            res.redirect('/applications')
        }
    })
})

//GET:/applications/delete/abc123

router.get('/delete/:_id',authCheck,(req, res) => {
    // get document id from url parameter
    let _id = req.params._id

    // use Mongoose to delete the document & redirect
    Application.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/applications')
        }
    })
})

// GET: /applications/edit/abc123 => show pre-populated Edit form
router.get('/edit/:_id', authCheck,(req, res) => {
    // read _id from url param
    let _id = req.params._id

    // query the db for the selected Application document
    Application.findById(_id, (err, application) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            // load the edit view and pass the selected Application doc to it for display
            res.render('applications/edit', {
                title: 'Edit Application',
                application: application,
                user: req.user
            })
        }
    })
})

// POST: /applications/edit/abc123 => update existing Application doc with values from form submission

router.post('/edit/:_id',authCheck,(req, res) => {

    //get document id from url param
    let _id = req.params._id

    // Use Mongoose findByIdAndUpdate to save changes to existing doc
    Application.findByIdAndUpdate({ _id: _id}, {

        'postDate': req.body.postDate,
        'applyDate': req.body.applyDate,
        'applyDeadline': req.body.applyDeadline,
        'startDay': req.body.startDay,
        'company': req.body.company,
        'position': req.body.position,
        'type':req.body.type,
        'location':req.body.location,
        'qualification':req.body.qualification,
        'term':req.body.term,
        'duty':req.body.duty,
        'salary':req.body.salary,
        'experience':req.body.experience,
        'education':req.body.education



    }, null,(err, application) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/applications')
        }
    })

})


// GET: /applications/details/abc123 => show pre-populated Edit form
router.get('/details/:_id', authCheck,(req, res) => {
    // read _id from url param
    let _id = req.params._id

    // query the db for the selected Application document
    Application.findById(_id, (err, application) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            // load the details view and pass the selected Application doc to it for display
            res.render('applications/details', {
                title: 'Details Application',
                application: application,
                user: req.user
            })
        }
    })
})








// make public
module.exports = router