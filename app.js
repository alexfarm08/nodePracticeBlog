const express = require('express');
const { title } = require('node:process');
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for req
app.listen(3000);

//middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log(`host: ${req.hostname}`);
    console.log(`path: ${req.path}`);
    console.log(`method: ${req.method}`);
    next();
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds egg', snippet: 'lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds star', snippet: 'lorem ipsum dolor sit amet consectetur'},
        {title: 'how to defeat bowseer', snippet: 'lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});