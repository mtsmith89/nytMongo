// dependecies
const express = require('express'),
      mongoose = require('mongoose'),
      exphbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      path = require('path');

// initialize express
const app = express();

// database setup
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoArticles";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//setting up Morgan middleware
app.use(logger('dev'));

//setting up body parser middleware
app.use(bodyParser.json());
// Because extended is set to false, the object will contain key/value pairs
// where the value can be a string or array.
app.use(bodyParser.urlencoded({
      extended: false
}));

//setting up handlebars middleware
app.engine('handlebars', exphbs({
      defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/articles', express.static(path.join(__dirname, 'public')));
app.use('/notes', express.static(path.join(__dirname, 'public')));


//setting up routes
const index = require('./routes/index'),
      articles = require('./routes/articles'),
      notes = require('./routes/notes'),
      scrape = require('./routes/scrape');

app.use('/', index);
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

//starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
      console.log(`Listening on http://localhost:${PORT}`);
});