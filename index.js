// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
} else {
    var express = require('express.io');
    var app     = express();
    var cons = require('consolidate');
    app.set('views', './public/views');
    app.engine('html', cons.underscore);
    app.set('view engine', 'html');
    app.http().io();
    
    
    //build your realtime-web app  
    require('./server')(app);
    
    app.use(express.static('public/views'));
    app.use(express.static('public/assets'));
    app.listen(7076);
   
    console.log('Worker ' + cluster.worker.id + ' running!');

}
// Listen for dying workers
cluster.on('exit', function (worker) {

    // Replace the dead worker,
    // we're not sentimental
    console.log('Worker ' + worker.id + ' died');
    cluster.fork();

});
