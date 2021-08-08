const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  genre: {
    name: String,
    description: String
  },
  desctription: {type: String, required: true},
  director: {
    name: String,
    bio: String
  },
  released: String,
  rating: String,
  actors: [String],
  imagepath: String,
  featured: Boolean
});

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birth_date: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
