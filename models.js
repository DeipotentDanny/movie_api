const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  genre: {
    name: String,
    description: String
  },
  description: {type: String, required: true},
  director: {
    name: String,
    bio: String,
    birth: String
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

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
