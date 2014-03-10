var express = require('express');
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    cons = require('consolidate'),
    app = express(),
    _PORT = 3006;

// use handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');


// all environments
app.set('port', process.env.PORT || _PORT);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({
  src: __dirname + '/public',
  compress: true 
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// HOMEPAGE
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
