// creating a server through Express
const express = require('express'),
  morgan = require('morgan'), //Utilizying morgan to log data
  bodyParser = require('body-parser'); //calling body-parser

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

// creating variable for express application
const app = express();

// morgan parameter = common
app.use(morgan('common'));

app.use(bodyParser.json());

const cors = require('cors');
const allowedOrigins = ['http://localhost:8080', 'https://myflixdd.herokuapp.com/', 'http://localhost:1234'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

const { check, validationResult } = require('express-validator');

const auth = require('./auth.js')(app);
const passport = require('passport');

require('./passport.js');

//location of static files for client-side req
app.use(express.static('public'));
app.get('/documentation', (_req, res) => {
  res.sendFile('./public/documentation.html', { root: __dirname });
});

//assigning response for index.js req
app.get('/', (_req, res) => {
  res.send('Welcome to the myFlix Application!');
});

//assigning the json movies array to endpoint /movies
app.get('/movies', /* passport.authenticate('jwt', {session: false}), */(_req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return data concerning a specific movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return a list of movies by genre
app.get('/movies/genres/:genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'genre.name': req.params.genre })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return data about a director by name
app.get('/movies/directors/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'director.name': req.params.name }, { director: 1 })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error ' + err);
    });
});

//New User Registration (Requires checks on Username, Password, and email)
app.post('/users',
  [
    check('username', 'Username is required').isLength({ min: 5 }),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.username + 'already exists.');
        } else {
          Users
            .create({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
              birth_date: req.body.birth_date
            })
            .then((user) => { res.status(201).json(user) })
            .catch((err) => {
              console.error(err);
              res.status(500).send('Error: ' + err);
            })
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
      });
  });

//User info update (username, password, email, date of birth)
app.put('/users/:username',
  [
    check('username', 'Username is required').isLength({ min: 5 }),
    check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Users.findOneAndUpdate({ username: req.params.username }, {
      $set:
      {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birth_date: req.body.birth_date
      }
    },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error ' + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

//Add movie to list of favorites
app.post('/users/:username/favorites/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Remove a movie from favorites list
app.delete('/users/:username/favorites/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//User Account Deregistration
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was mot found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error ' + err);
    });
});

//error check
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Failed!');
});

//assigning server to a variable port
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
