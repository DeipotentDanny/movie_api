// creating a server through Express
const express = require('express'),
  morgan = require('morgan'), //Utilizying morgan to log data
  bodyParser = require('body-parser'); //calling body-parser

// JSON obj array for list of movies
const movies = [
  {
    title: "Iron Man",
    genres: "Action-Adventure",
    description:"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    released:"2008",
    rating:"7.9/10",
    director:"Jon Favreau",
    actors: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges", "..."],
    featured:"",
  },
  {
    title: "Avengers: Endgame",
    genres: "Action-Adventure",
    description:"After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    released:"2019",
    rating:"8.4/10",
    director: ["Antohny Russo", "Joe Russo"],
    actors:["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "..."],
    featured:"",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genres: "Fantasy",
    description:"A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    released:"2001",
    rating:"8.8/10",
    director:"Peter Jackson",
    actors:["Elijah Wood","Ian McKellen", "Orlando Bloom", "..."],
    featured:"",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    genres: "Fantasy",
    description:"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    released:"2003",
    rating:"8.9/10",
    director:"Peter Jackson",
    actors:["Elijah Wood", "Viggo Mortensen", "Ian McKelles", "..."],
    featured:"",
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    genres: "Fantasy",
    description:"Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.",
    released:"2004",
    rating:"7.9/10",
    director:"Alfonso Cuaron",
    actors:["Daniel Radcliffe", "Emma Watson", "Rupert Grint", "..."],
    featured:"",
  },
  {
    title: "Harry Potter and the Order of the Pheonix",
    genres: "Fantasy",
    description:"With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts.",
    released:"2007",
    rating:"7.5/10",
    director:"David Yates",
    actors:["Daniel Radcliffe", "Emma Watson", "Rupert Grint", "..."],
    featured:"",
  },
  {
    title: "Harry Potter and the Half-Blod Prince",
    genres: "Fantasy",
    description:"As Harry Potter begins his sixth year at Hogwarts, he discovers an old book marked as 'the property of the Half-Blood Prince' and begins to learn more about Lord Voldemort's dark past.",
    released:"2009",
    rating:"7.6/10",
    director:"David Yates",
    actors:["Daniel Radcliffe", "Emma Watson", "Rupert Grint", "..."],
    featured:"",
  },
  {
    title: "Thor: Ragnarok",
    genres: "Action-Adventure",
    description:"Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
    released:"2017",
    rating:"7.9/10",
    director:"Taika Waititi",
    actors:["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett", "..."],
    featured:"",
  },
  {
    title: "The Help",
    genres: "Drama",
    description:"An aspiring author during the civil rights movement of the 1960s decides to write a book detailing the African American maids' point of view on the white families for which they work, and the hardships they go through on a daily basis.",
    released:"2011",
    rating:"8.0/10",
    director:"Tate Taylor",
    actors:["Emma Stone", "Viola Davis", "Octavia Spencer", "..."],
    featured:"",
  },
  {
    title: "Schindler's List",
    genres: "Historical Drama",
    description:"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    released:"1993",
    rating:"8.9/10",
    director:"Steven Spielberg",
    actors:["Liam Neeson", "Ralph Fiennes", "Ben Kingsley", "..."],
    featured:"",
  },
];

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
  res.json(movies);
});

//Return data concerning a specific movie by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) => {
    return movie.title === req.params.title
  }));
});

//Return a list of movies by genre
app.get('/movies/genre/:genres', (req, res) => {
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
