var express = require('express');
var router = express.Router();

// passport for auth
const passport = require('passport')
//User这个model加入
const User = require('../models/user')


/* GET home page. */
router.get('/', (req, res) =>  {
  res.render('index', { title: 'homepage',
  user:req.user
  });
});

// GET: /register

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  })
})

// GET: /login
router.get('/login', (req, res) => {
    // check the session for error messages
    let messages = req.session.messages || []
    req.session.messages = []

    res.render('login', {
        title: 'Login',
        messages: messages
    })
})

// POST: /register
router.post('/register', (req, res) => {
    // use User Model & passport to create a new user in MongoDB.  Send password separately so it can be hashed by passport
    User.register(new User({ username: req.body.username }), req.body.password, (err, newUser) => {
        if (err) {
            console.log(err)
            res.render('register', {
                message: err
            })
        }
        else {
            // registration succeeded.  log user in and load main artist page
            req.login(newUser, (err) => {
                res.redirect('/applications')
            })
        }
    })
})


// POST: /login - passport.authenticate does all the work behind the scenes to validate the login attempt
router.post('/login', passport.authenticate('local', {
    successRedirect: '/applications',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login' // stored in the session object
}))

//GET / logout
router.get('/logout',((req, res) => {

    req.logout()
    res.redirect('login')

}))

// GET: /github
router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}))

// GET: /github/callback
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/applications')
})




module.exports = router;
