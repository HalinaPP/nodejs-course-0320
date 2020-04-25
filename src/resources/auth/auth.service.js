const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../users/user.model');
const usersService = require('../users/user.service');

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    (username, password, done) => {
      const user = usersService.checkUserAuth(username, password);
      /*  User.findOne({ login: username }, (err, user) => {
        if (err) {
          return done(err);
        }*/

      if (!user) {
        return done(null, false, 'Bad login/password combination');
      }
      return done(null, user);
      // }      );
    }
  )
);
passport.use(
  'bearer',
  new BearerStrategy((token, done) => {
    const user = usersService.findOneByToken({ token });

    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: 'all' });
  })
);
const authenticate = passport.authenticate('bearer', { session: false });
const authenticateLocal = passport.authenticate('local', {
  failureRedirect: '/login',
  ession: false
});

module.exports = { authenticate, authenticateLocal };
