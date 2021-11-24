const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
// express app
const app = express();

//mongoDB
const dbURI = 'mongodb+srv://test_user:test23112021@cluster0.kqxmo.mongodb.net/node-blog?retryWrites=true&w=majority';
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

app.get('/blogs',(req, res) =>{
    Blog.find().sort({createdAt: -1 })
        .then((result) =>{
            res.render('index', {title:'All blogs', blogs: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.post('/blogs',(req,res) =>{
    const blog = new Blog(req.body);
    blog.save()
        .then((result) =>{
            res.redirect('/blogs');
        })
        .catch((err) =>{
            console.log(err);
        })
})
app.get('/blogs/create', (req, res) =>{
    res.render('create', {title:'New blog'});
})

app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result) =>{
            res.render('single-blog',{blog: result, title:'Blog detail'});
        })
        .catch(err => console.log(err));
})

app.delete('/blogs/:id',(req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => console.log(err));
})

app.use((req, res) =>{
    res.status(404).render('404', {title:'Not found'});
})