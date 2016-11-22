const User = require("../models/user");

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password"})
  }

  User.findOne({ email: email }, function(err, user) {
    // db error
    if (err) {
      return next(err);
    }
    // User already exists in the db
    if (user) {
      return res.status(422).send({ error: "Email is in use" })
    }
    // Create a new user
    const user = new User({
      email: email,
      password: password
    });
    // Save th enew user to the db
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });

  })

  res.send({ success: "true" });
}
