// creating a server through Express
const express = require('express'),
  morgan = require('morgan'), //Utilizying morgan to log data
  bodyParser = require('body-parser'); //calling body-parser

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Modles.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// creating variable for express application
const app = express();

// morgan parameter = common
app.use(morgan('common'));

app.use(bodyParser.json());

//location of static files for client-side req
app.use(express.static('public'));
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

//assigning response for index.js req
app.get('/', (req, res) => {
  res.send('Welcome to the myFlix Application!');
});

//assigning the json movies array to endpoint /movies
app.get('/movies', (req, res) => {
 res.json('Successful GET req')
});

//Return data concerning a specific movie by title
app.get('/movies/:title', (req, res) => {
  res.json('Successful GET req')
});

//Return a list of movies by genre
app.get('/movies/genres/:genre', (req, res) => {
  res.json('Sucessful Get that returns a list of movies within a shared genre')
});

//Return data about a director by name (Creation of JSON array 'directors' necessary)
app.get('/movies/directors/:name', (req, res) => {
  res.json('Successful GET req that returns data concerning a specific director by name')
  // res.json(directors.find((director) => {
  //   return director.name === req.params.name
  // }));
});

//Return data about an actor by name
app.get('/movies/actors/:name', (req, res) => {
  res.json('Succesful GET req that retruns data concerning a specific actor by name');
});

//New User Registration (Requires checks on Username, Password, and email)
app.post('/users', (req, res) => {
  res.json('Successful POST req that adds new User data to server');
});

//User info update (username, password, email, date of birth)
app.put('/users/:username', (req, res) => {
  res.json('Successful PUT req that updates user data on server');
});

//Add movie to list of favorites
app.post('/users/:username/favorites', (req, res) => {
  res.json('Successful POST req that adds movie data to favorites array on server');
});

//Remove a movie from favorites list
app.delete('/users/:username/favorites', (req, res) => {
  res.json('Successful DELETE req that removes movie data from favorites array on server');
});

//Add movie to a WatchList
app.post('/users/:username/watchlist', (req, res) => {
  res.json('Successful POST req that adds movie data to watchlist array on server');
});

//Remove a movie from watchlist
app.delete('/users/:username/watchlist', (req, res) => {
  res.json('Successful DELETE req that removes movie data from watchlist on server');
});

//User Account Deregistration
app.delete('/users/:username', (req, res) => {
  res.json('Successful DELETE req that removes user data from server');
});

//error check
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Failed!');
});

//assigning server to port 8080
app.listen(8080, () => {
  console.log('This app is listening on port 8080.');
});
