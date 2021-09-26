const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: {
    name: String,
    description: String
  },
  description: { type: String, required: true },
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
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

userSchema.statics.hashPassword = (Password) => {
  return bcrypt.hashSync(Password, 10);
};

userSchema.methods.validatePassword = function (Password) {
  return bcrypt.compareSync(Password, this.Password);
};

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
