//load express
const express = require('express'); 
//config express server 
const app = express(); 
const PORT = 3000; 
//load handlebars 
const handlebars = require('express-handlebars'); 
//configure handlebars 
app.set('view engine', 'hbs'); 
app.engine('hbs', handlebars( {
    layoutsDir: __dirname + '/views/layouts', 
    extname: 'hbs', 
    defaultLayout: 'planB', 
    partialsDir: __dirname + '/views/partials'
})); 

const glide = require('@glidejs/glide'); 

//get css 
app.use(express.static('public')); 
app.use(express.static('/@glidejs/glide')); 
//route 
app.get('/', (req, res) => {
    //res.send('Done yet?'); 
    //res.render('main', {layout: 'index'}); 
    //res.render('main');
    //res.render('login', {layout: 'index'}); 
    //res.render('content', {layout: 'index'});
    res.render('thread', {layout: 'index'})  
}); 
//listen 
app.listen(PORT, () => console.log(`App listening on ${PORT}`)); 