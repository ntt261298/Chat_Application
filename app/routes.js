module.exports = function(app, passport){
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
    res.render('signup');
  });

}
