const passport =  require('passport');

const LocalStrategy= require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.entrar', new LocalStrategy({
usernameField:'nombreusu',
passwordField:'pass',
passReqToCallback: true
},async (req, nombreusu,pass, done) =>{
    console.log(req.body);
const rows = await pool.query('select * from users where nombreusu = ?', [nombreusu]);
if(rows.length > 0){
    const user = rows[0];
   const validpass = await helpers.matchPassword(pass, user.pass);
   if(validpass){
       done(null,user, req.flash('success','Bienvenido' + user.nombreusu));
   }else{
       done('null',false, req.flash('message','Contrasena incorrecta'));
   }
}else{
    return done(null,false,req.flash('message','El usuario no existe'));
}
}));


passport.use('local.regis', new LocalStrategy({
usernameField:'nombreusu',
passwordField:'pass',
passReqToCallback: true

},async (req,nombreusu,pass,done)=>{
const {nombrecom} = req.body;
   const newUser = {
       nombreusu,
       pass,
       nombrecom      

   };
   newUser.pass = await  helpers.encryptPassword(pass);
   const result = await pool.query('insert into users set ?', [newUser]);
   newUser.id = result.insertId;
   return done(null,newUser);
}));

passport.serializeUser((user, done) =>{
done(null,user.id);
});

passport.deserializeUser(async (id, done)=>{
const rows = await pool.query('select * from users where id = ?',[id]);
done(null, rows[0]);
});