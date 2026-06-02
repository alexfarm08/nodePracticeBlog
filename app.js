const express = require('express');
const { title } = require('node:process');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for req
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>Home Page</p>');
    res.render('index', {title: 'Home'});
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