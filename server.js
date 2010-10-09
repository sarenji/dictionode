var express = require("express"),
    redis = require("redis"),
    client = redis.createClient();

HOST = null; // localhost
PORT = 6117;

var app = express.createServer();

// route paths
app.get('/:word', function(req, res) {
    res.render('home.jade', {
        locals: {
            word : req.params.word
        }
    });
});

// configure express
app.configure(function() {
    app.use(express.staticProvider(__dirname + '/public'));
    app.set('view engine', 'jade');
});

app.listen(PORT);
