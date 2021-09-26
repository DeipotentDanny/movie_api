const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

const Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  UsernameField: 'Username',
  PasswordField: 'Password'
}, (Username, Password, callback) => {
  console.log(Username + ' ' + Password);
  Users.findOne({ Username: Username }, (error, user) => {
    if (error) {
      console.log(err);
      return callback(err);
    }

    if (!user) {
      console.log('incorrect Username');
      return callback(null, false, { message: 'Incorrect Username or Password.' });
    }

    if (!user.validatePassword(Password)) {
      console.log('incorrect Password');
      return callback(null, flase, { message: 'Incorrect Password.' });
    }

    console.log('finished');
    return callback(null, user);
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((err) => {
      return callback(err)
    });
}));
