/*
* Passport Config
*
* provides strategy for logging in/out users
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../../models/user');
const validator = require('./helpers');

passport.serializeUser((user, done) => {
  done(null, user.uid);
});

passport.deserializeUser((uid, done) => {
  user.findOne({ where: {
      uid: uid
    } 
  })
  .then(({ uid, email }) => {
    done(null, { uid, email } );
  })
  .catch(err => done(err));
});

passport.use(new LocalStrategy( 

  {
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true 
  },

  (req, email, password, done) => {
    user.findOne({ 
      where: { 
        email: email 
      } 
    })
    .then(user => {
      if(!user){
        console.log('User does not exist'); 
        return done(null, false, { message: 'no matching email' }); 
      }
      
      console.log('Attempting login: ', JSON.stringify(user));
      
      if(!validator.validatePassword(user.password, password)){

        console.log('Password validation error');

        return done(null, false, { message: 'Invalid password' });
      }

      console.log('User found: ', JSON.stringify(user));

      return done(null, user.get());
    })
    .catch(err => {
      if(err){ 
        console.log('Auth Error: ', err); 
      };

      return done(null, false, { message: 'uh oh' }); 
    });
}));

module.exports = passport;