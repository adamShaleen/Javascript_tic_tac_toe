$(document).ready(function() {

  // Defaults on load ================================================
  var player, availableMoves, madeMoves = [];
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
          checkForWinner();
          computerMakeMove();
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
    $("#gameInProgressContainer").hide();
    $("#resetButton").hide();
    $("#choosePlayerContainer").show();
    loadAllMoves();
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
          console.log(xMoves, oMoves);
      }

      return false;
  }

  // winning combos (8)
  // cell1 cell2 cell3
  // cell1 cell5 cell9
  // cell1 cell4 cell7
  // cell2 cell5 cell8
  // cell3 cell5 cell7
  // cell3 cell6 cell9
  // cell4 cell5 cell6
  // cell7 cell8 cell9

});
