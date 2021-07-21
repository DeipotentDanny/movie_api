const express = require('express');
  morgan = require('morgan');

const topMovies = [
  {
    title: "Iron Man",
    genres: "Action-Adventure",
  },
  {
    title: "Avengers: Endgame",
    genres: "Action-Adventure",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genres: "Fantasy",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    genres: "Fantasy",
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    genres: "Fantasy",
  },
  {
    title: "Harry Potter and the Order of the Pheonix",
    genres: "Fantasy",
  },
  {
    title: "Harry Potter and the Half-Blod Prince",
    genres: "Fantasy",
  },
  {
    title: "Thor: Ragnarok",
    genres: "Action-Adventure",
  },
  {
    title: "The Help",
    genres: "Drama",
  },
  {
    title: "Schindler's List",
    genres: "Historical Drama",
  },
];

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  res.send('Welcome to the myFlix Application!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Failed!');
});

app.listen(8080, () => {
  console.log('This app is listening on port 8080.');
});
