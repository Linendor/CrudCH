module.exports = {

isLoggedIn(req, res, next){
if (req.isAuthenticated()){
return next();
}else{
return res.redirect('/entrar');
}
},

isNotloggedIn(req, res, next){
if(!req.isAuthenticated()){
    return next();
}
return res.redirect('/profile');
}


};