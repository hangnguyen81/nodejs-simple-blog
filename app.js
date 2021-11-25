const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

//mongoDB
const dbURI = 'paste uri to mongodb here ';
mongoose.connect(dbURI)
    .then((result)=>app.listen(3001))
    .catch((err) => console.log(err))


// register view engine
app.set('view engine', 'ejs');

//middleware and staticfile
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//routing
app.get('/', (req, res) =>{
    res.redirect('/blogs');
})

app.get('/about', (req, res) =>{
    res.render('about',{title:'About'});
})

//blog routes
app.use('/blogs',blogRoutes);

app.use((req, res) =>{
    res.status(404).render('404', {title:'Not found'});
})
