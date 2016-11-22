const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
  // User instance which is going to be saved
  const user = this;
  // Generate a salt, the run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    // hash (encrypt) our password using the salt, then run callback
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  })
});

const model = mongoose.model("user", userSchema);

module.exports = model;
