var TicTacToe = require("../models/tictactoe");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

// Display list of all posts.
exports.index = function (req, res, next) {
  TicTacToe.findOne({}).exec((err, game) => {});
};

// Handle book create on POST.
exports.create = function (req, res, next) {
  sanitizeBody("*").trim().escape();

  // Create a post object
  // Improve: Use promises with .then()
  var post = new TicTacToe({
    content: req.body.content,
    author: req.body.author
  });

  post.save(function (err) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to new book record.
    res.redirect("/posts");
  });
};
