const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will get all promotions');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will get the promotion' + req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Deleting promotion:'  + req.params.promoId);
});


module.exports = promoRouter;