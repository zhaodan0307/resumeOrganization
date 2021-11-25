var express = require('express');
var router = express.Router();

const passport = require('passport')
router.get('/',((req, res) => {

    res.render('applications/index', {
        title: 'Applications',
        user:req.user

    });






}))







// make public
module.exports = router