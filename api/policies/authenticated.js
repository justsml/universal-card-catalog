module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  } else {
    waterlock.validator.validateTokenRequest(req, function(err, user){
      if(err) {
        return res.forbidden(err);
      }
      // valid request
      next();
    });
  }
};
