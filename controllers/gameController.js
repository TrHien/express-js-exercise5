var TicTacToe = require("../models/tictactoe");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

// Display list of all posts.
exports.index = function (req, res, next) {
  TicTacToe.findOne({}).exec((err, game) => {
    let responseData = {
      success: false,
      data: null,
      error: null
    };
    if (err) {
      responseData.error = err;
    } else {
      responseData.success = true;
      if (game && !game.is_game_finished) {
        responseData.data = game;
      }
    }
    res.json(responseData);
  });
};

// Handle book create on POST.
exports.create = function (req, res, next) {
  sanitizeBody("*").trim().escape();

  // Create a post object
  // Improve: Use promises with .then()
  let jsonReq = req.body;

  let boardGame = new TicTacToe({
    is_game_finished: false,
    winner: null,
    game_size: jsonReq.gameSize,
    players: {
      tic: [],
      toc: []
    }
  });

  boardGame.save((err) => {
    let responseData = {
      success: true,
      data: boardGame,
      error: null
    };

    if (err) {
      responseData.success = false;
      responseData.error = err;
    }
    res.json(responseData);
  });
};

exports.delete = function (req, res, next) {
  TicTacToe.deleteOne({}, (err) => {
    let responseData = {
      success: true,
      data: true,
      error: null
    };

    if (err) {
      responseData.success = false;
      responseData.error = err;
    }
    res.json(responseData);
  });
};
