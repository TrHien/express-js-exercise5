var N_SIZE = 5,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves;

async function getBoardGame() {
  try {
    let resp = await fetch("/game");
    let jsonResp = await resp.json();
    if (jsonResp.success) {
      return jsonResp.data;
    } else {
      return null;
    }
  } catch (e) {
    return e;
  }
}

function createBoardGame(gameSize) {
  return new Promise((resolve, reject) => {
    fetch("/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ gameSize: parseInt(gameSize) })
    })
      .then((res) => res.json())
      .then((jsonResp) => {
        if (jsonResp.success) {
          resolve(true);
        } else {
          reject(jsonResp.error);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function init() {
  getBoardGame()
    .then((gameData) => {
      if (!gameData) {
        let boardSize = prompt("Please enter board size:", "3");
        if (boardSize != null && boardSize !== "") {
          N_SIZE = parseInt(boardSize);
        }
        createBoardGame(N_SIZE);
      } else {
        N_SIZE = gameData.game_size;
      }

      var board = document.createElement("table");
      board.setAttribute("border", 1);
      board.setAttribute("border-spacing", 0);

      var identifier = 1;
      for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement("tr");
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
          var cell = document.createElement("td");
          cell.setAttribute("height", 60);
          cell.setAttribute("width", 60);
          cell.setAttribute("align", "center");
          cell.classList.add("col" + j, "row" + i);
          if (i === j) {
            cell.classList.add("diagonal0");
          }
          if (j === N_SIZE - i - 1) {
            cell.classList.add("diagonal1");
          }
          cell.identifier = identifier;
          cell.addEventListener("click", set);
          row.appendChild(cell);
          boxes.push(cell);
          identifier += identifier;
        }
      }

      document.getElementById("board").appendChild(board);
      startNewGame();
    })
    .catch((err) => console.error(err));
}

function startNewGame() {
  score = {
    X: 0,
    O: 0
  };
  moves = 0;
  turn = "X";
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#board " + testClass, turn);
    if (items.length === N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    if (turn === "X") {
      alert("Player 1 won!");
    } else alert("Player 2 won!");

    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
    startNewGame();
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

init();
