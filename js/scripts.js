$(document).ready(function() {

  // Defaults on load ================================================
  var player, winner, availableMoves, madeMoves = [];
  loadApp();

  // Player Select / Game create =====================================
  $("#chooseXButton").click(function() {
      startGame("X");
  });

  $("#chooseOButton").click(function() {
      startGame("O");
  })

  // Gameplay Move ===================================================
  $(".game-cell").click(function() {
      if (gameInProgress()) {
          makeMove(player, $(this).attr('id'));
          if (!checkForWinner()) {
            computerMakeMove();
          }
          if (!checkForWinner() && availableMoves.length === 0) {
              $("#winnerAlert").html("DRAW").show();
              return;
          }
          checkForWinner();
      }
  });

  // Reset Game ======================================================
  $("#resetButton").click(function() {
    deleteGame();
  });

  // Utilities =======================================================
  function loadApp() {
      loadAllMoves();
      $("#gameInProgressContainer").hide();
      $("#resetButton").hide();
      $("#winnerAlert").hide();
  }

  function startGame(playerChoice) {
      $("#choosePlayerContainer").hide();
      $("#gameInProgressContainer").show();
      $("#resetButton").show();
      player = playerChoice;
  }

  function computerMakeMove() {
      var computer = determinePlayer();
      var computerMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
      makeMove(computer, computerMove);
  }

  function makeMove(player, move) {
      availableMoves = availableMoves.filter(function(usedMove) { return usedMove !== move} );
      madeMoves.push({player : player, move : move});
      $("#" + move).html(player);
  }

  function deleteGame() {
    player = "";
    madeMoves = [];
    $(".game-cell").html("");
    $(".game-cell").removeClass("winning-highlight");
    $("#gameInProgressContainer").hide();
    $("#resetButton").hide();
    $("#choosePlayerContainer").show();
    loadAllMoves();
    $("#winnerAlert").hide();
  }

  function gameInProgress() {
      if ($("#gameInProgressContainer").is(":visible")) {
          return true;
      }
      return false;
  }

  function determinePlayer() {
      return player === "X" ? "O" : "X";
  }

  function loadAllMoves() {
      availableMoves = ["cell1", "cell2", "cell3", "cell4", "cell5", "cell6", "cell7", "cell8", "cell9"];
  }

  function checkForWinner() {
      if (madeMoves.length >= 4) {
          var xMoves = madeMoves.filter(x => x.player === "X").map(m => m.move).sort();
          var oMoves = madeMoves.filter(o => o.player === "O").map(m => m.move).sort();

          if (checkCombo(xMoves)) {
            winner = "X";
            showWinner(winner);
            return true;
          }

          if (checkCombo(oMoves)) {
              winner = "O";
              showWinner(winner);
              return true;
          }
      }

      return false;
  }

  function checkCombo(movesArray) {

      var winningRow = [];

      if (movesArray.includes("cell1") && movesArray.includes("cell2") && movesArray.includes("cell3")) {
          winningRow.push("cell1", "cell2", "cell3");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell1") && movesArray.includes("cell5") && movesArray.includes("cell9")) {
          winningRow.push("cell1", "cell5", "cell9");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell1") && movesArray.includes("cell4") && movesArray.includes("cell7")) {
          winningRow.push("cell1", "cell4", "cell7");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell2") && movesArray.includes("cell5") && movesArray.includes("cell8")) {
          winningRow.push("cell2", "cell5", "cell8");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell3") && movesArray.includes("cell5") && movesArray.includes("cell7")) {
          winningRow.push("cell3", "cell5", "cell7");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell3") && movesArray.includes("cell6") && movesArray.includes("cell9")) {
          winningRow.push("cell3", "cell6", "cell9");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell4") && movesArray.includes("cell5") && movesArray.includes("cell6")) {
          winningRow.push("cell4", "cell5", "cell6");
          highlightWin(winningRow);
          return true;
      }

      if (movesArray.includes("cell7") && movesArray.includes("cell8") && movesArray.includes("cell9")) {
          winningRow.push("cell7", "cell8", "cell9");
          highlightWin(winningRow);
          return true;
      }

      return false;
  }

  function highlightWin(arr) {
      $.each(arr, function(index, value) {
          $("#" + value).addClass("winning-highlight");
      });
  }

  function showWinner(winner) {
      $("#winnerAlert").html(winner + " is the winner!").show();
  }

});
