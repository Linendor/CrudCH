const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn}  = require('../lib/auth');

router.get('/agregar',isLoggedIn,(req, res)=>{
  
res.render('links/agregar');
});



router.post('/agregar',isLoggedIn, async(req, res)=>{
    const {nombre,apellidoP,apellidoM,direccion,telefono,correo,plantel,perfil} = req.body;
    const newLink = {
        nombre,
        apellidoP,
        apellidoM,
        direccion,
        telefono,
        correo,
        plantel,
        perfil,
        user_id: req.user.id
    };

    await pool.query('insert into personal set ?',[newLink]);
    req.flash('success','Usuario Guardado correctamente');
    res.redirect('/links')
});

router.get('/',isLoggedIn, async (req,res)=>{
    const links = await pool.query('select * from personal where user_id = ?',[req.user.id]);
console.log(links);
res.render('links/list', {links});
console.log(links);
});

router.get('/delete/:id',isLoggedIn, async (req,res) =>{
const {id} = req.params;
await pool.query('delete from personal where id = ?',[id]);
req.flash('success','Usuario removido');
res.redirect('/links');
});


router.get('/edit/:id',isLoggedIn, async (req, res) =>{
const { id }  = req.params;
const personal =  await pool.query('select * from personal where id = ?',[id]);

res.render('links/edit',{personal: personal[0]});
});


router.post('/edit/:id',isLoggedIn, async (req, res) =>{

    const {id} = req.params;
    const {nombre,apellidoP,apellidoM,direccion,telefono,correo,plantel,perfil} = req.body;

    const newLink = {
       nombre,
        apellidoP,
        apellidoM,
        direccion,
        telefono,
        correo,
        plantel,
        perfil 
    };
    console.log(newLink);
    await pool.query('update personal set ? where id = ?',[newLink,id]);
    req.flash('success','Usuario actualizado');
    res.redirect('/links');
});

module.exports = router;