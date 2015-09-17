/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var cluster = require('cluster');
function server(app) {
    console.log(app.views);
     app.get('/', function(req, res) {
	 //req.io.route('some-cool-realtime-route');
         res.render('index', {
            title: 'Ride the Handlebars',
            author: {name: 'Lemmy Kilmister', age:67},
            message: 'It seems that our brave new world is becoming less tolerant, spiritual and educated than it ever was when I was young.'
          });
	 //res.send('Hello from Worker ' + cluster.worker.id);
   });
}

// Functions which will be available to external callers
module.exports = server;
