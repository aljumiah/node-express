const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const rethinkRouter = require('./routes/rethinkRouter')

r = require('rethinkdb');
var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);
app.use('/dishes', dishRouter);
app.use('/rethink', rethinkRouter);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(req,res,next){
    r.connect({
       host: 'localhost',
       port: 28015,
       db: 'test'
    },function(err,conn){
       req['app_conn']=conn;
       r.table('tv_shows').changes().run(connection, function(err, cursor) {
        cursor.each(console.log);
      });
       next();
    });
   });



const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});