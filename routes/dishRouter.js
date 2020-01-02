const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will get all dishes');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

dishRouter.route('/:dishId')
.get((req,res,next) => {
    res.end('Will get the dish' + req.params.dishId);
})
.delete((req, res, next) => {
    res.end('Deleting dishe:'  + req.params.dishId);
});

module.exports = dishRouter;