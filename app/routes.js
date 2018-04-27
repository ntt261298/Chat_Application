

module.exports = function(app, passport) {
  app.get('/home', function(req, res){
    res.render('home');
  });
  app.get('/login', function(req, res){
    res.render('login', {message: req.flash('loginMessage')});
  });
  app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/private',
        failureRedirect : '/login',
        failureFlash : true
  }));
  app.get('/signup', function(req, res){
    res.render('signup', {message: req.flash('signupMessage')});
  });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/login',
    failureRedirect : '/signup',
    failureFlash : true
  }));
  app.get('/private', isLoggedIn, function(req, res) {
      res.render('private', {
        user: req.user //Truyen doi tuong user cho private.ejs
      });
    });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  })
  function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
        return next();
    res.redirect('/home');
  }
};
