// // without express
// kept file for example
// const http = require('http');
// const fs = require('fs');
// const _ = require('lodash');

// const server = http.createServer((req, res) => {
    
//     //lodash
//     //lodash random num
//     const num = _.random(0, 20);
//     console.log(num);

//     //lodash once allows a func to execute 1 time
//     const greet = _.once(() => {
//         console.log('Hello');
//     });

//     greet();
//     greet();

//     // set header content type
//     res.setHeader('content-type', 'text/html');
    
//     // check url to find path
//     let path = './views/';

//     switch(req.url) {
//         case '/':
//             path += 'index.html';
//             res.statusCode = 200;
//             break;
//         case '/about':
//             path += 'about.html';
//             res.statusCode = 200;
//             break;
//         case '/about-me':
//             res.statusCode = 301;
//             res.setHeader('location', '/about');
//             res.end();
//             break;
//         default:
//             path += '404.html';
//             res.statusCode = 404;
//             break;
//     }

//     // send a html file
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.end();
//         } else {
//             res.end(data);
//         }
//     });
// });

// server.listen(3000, 'localhost', () => {
//     console.log('listening for req on port 3000');
// });