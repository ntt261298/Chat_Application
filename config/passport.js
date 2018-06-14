var LocalStrategy = require('passport-local').Strategy;
var db = require('./db.js');
var User = require('../app/user.js');

module.exports = function(passport){
  passport.use('local-login', new LocalStrategy({
    passReqToCallback : true
  },
    (req, username, password, done) => {
      User.findOne({where: {username: username}}).then(((user) => {
        if(!user){
         return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if(user.password == password)
          return done(null, user);
        else{
          done(null, false, req.flash('loginMessage', 'Wrong password.'));
        }
      }))
    }
  ));

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  },
    (req, username, password, done) => {
        User.findOne({where: {username: username}}).then(user => {
          if(user)
            return done(null, false, req.flash('signupMessage', "Username existed."));
          else{
            User.create({
              username : username,
              password : password
            })
            return done(null, user, req.flash('signupMessage', "Signup successfully."));
          }
        })
      })
)
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    User.findOne({where: {username: user.username }}).then((user, err) => {
      if(err)
        done(err, null);
      done(null, user);
    })
  });
}
