const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../users/user.model');
const usersService = require('../users/user.service');

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    async (username, password, done) => {
      const user = await usersService.checkUserAuth(username, password);
      // .then(user => {
      console.log(`${`local str user=${user.login}` + ' user='}${user}`);
      if (!user) {
        return done(null, false, 'Bad login/password combination');
      }
      console.log('local str before return');
      return done(null, user);
      // });

      /*  User.findOne({ login: username }, (err, user) => {
        if (err) {
          return done(err);
        }*/

      // }      );
    }
  )
);
passport.use(
  new BearerStrategy(async (token, done) => {
    console.log(`bearer str user=${token}`);
    const user = await usersService.findOneByToken(token);
    console.log(`${`bearer str user=${user.login}` + ' user='}${user}`);
    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: 'all' });
  })
);
const authenticate = passport.authenticate('bearer', { session: false });
const authenticateLocal = passport.authenticate('local', {
  //  failureRedirect: '/login',
  session: false
});

const checkTokenF = async (req, res, next) => {
  console.log(`in checkToken=${req.header('Authorization')}`);
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(`in token=${token}`);
  try {
    const user = await usersService.findOneByToken(token);
    console.log(`${`bearer str user=${user.login}` + ' user='}${user}`);
    if (!user) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
    }
    req.token = token;
    req.user = user;

    return next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};
module.exports = { authenticate, authenticateLocal, checkTokenF };
