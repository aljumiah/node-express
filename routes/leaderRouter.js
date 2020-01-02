const express = require('express');
const bodyParser = require('body-parser');
r = require('rethinkdb');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will get all leaders');
})

.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.id + ' with name: ' + req.body.name);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    res.end('Will get the leader' + req.params.leaderId);
})
.delete((req, res, next) => {
    res.end('Deleting leader:'  + req.params.leaderId);
});

module.exports = leaderRouter;