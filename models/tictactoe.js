var mongoose = require("mongoose");

var Schema = mongoose.Schema;

let TicTacToeSchema = new Schema({
  is_game_finished: { type: Boolean },
  winner: { type: String },
  game_width: { type: Number },
  players: {
    tic: { type: Array },
    toc: { type: Array }
  }
});

// Export model.
module.exports = mongoose.model("TicTacToe", TicTacToeSchema);
