require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

// express app
const app = express();

// connect to mongo db
const dburi = process.env.MONGODB_URI;
if (!dburi) {
    throw new Error('Missing MONGODB_URI in .env');
}

mongoose.connect(dburi, {
    serverSelectionTimeoutMS: 10000,
})
    .then((result) => {
        console.log('connected to db');
        // listen for req
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));

// mongoose and mongo test routes
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req,res) => {
    Blog.find()
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('6a2a4782fa688f42f34ec081')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.use((req, res, next) => {
    console.log('new request made:');
    console.log(`host: ${req.hostname}`);
    console.log(`path: ${req.path}`);
    console.log(`method: ${req.method}`);
    next();
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.render('about', {title: 'About'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});