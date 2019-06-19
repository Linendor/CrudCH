const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn} =  require('../lib/auth');
const {isNotloggedIn} = require('../lib/auth');

router.get('/regis',isLoggedIn, (req, res)=>{
 res.render('auth/regis');
});



router.post('/regis',isLoggedIn, passport.authenticate('local.regis',{
    successRedirect:'/profile',
    failureRedirect:'/regis',
    failureFlash:true
}));

router.get('/entrar',isNotloggedIn,(req, res) => {
    res.render('auth/entrar');
});

router.post('/entrar',isNotloggedIn,(req, res, next) => {
passport.authenticate('local.entrar', {
    successRedirect: '/profile',
    failureRedirect: '/entrar',
    failureFlash: true
})(req, res, next);

});


router.get('/profile', isLoggedIn,  (req, res) => {
res.render('profile');
});


router.get('/logout',isLoggedIn, (req, res) =>{
    req.logOut();
    res.redirect('/entrar');
});

module.exports = router;