var express = require('express');
var router = express.Router();


router.get('/',((req, res) => {

    res.render('applications/index', { title: 'Applications' });






}))







// make public
module.exports = router