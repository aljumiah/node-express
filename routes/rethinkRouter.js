const express = require('express');
const bodyParser = require('body-parser');

const rethinkRouter = express.Router();

r = require('rethinkdb');
// var connection = null;
// r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
//     if (err) throw err;
//     connection = conn;
// })

rethinkRouter.use(bodyParser.json());

rethinkRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req,res,next) => {
    res.end('rethink');
})
.post((req, res, next) => {
    r.table('tv_shows').insert([
        {id: 0, timestamp: new Date()},
        {id: 1, timestamp: r.epochTime(1376436769.923)}
    ]).run(conn, callback);
    res.end('data added');
})
.put((req, res, next) => {
    // res.statusCode = 403;
    // res.end('PUT operation not supported on /dishes');
});

// rethinkRouter.route('/:dishId')
// .get((req,res,next) => {
//     res.end('Will get the dish' + req.params.dishId);
// })
// .delete((req, res, next) => {
//     res.end('Deleting dishe:'  + req.params.dishId);
// });

module.exports = rethinkRouter;