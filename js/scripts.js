$(document).ready(function() {

  // Defaults on load ================================================
  var player, availableMoves;
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
          computerMakeMove();
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
      $("#" + move).html(player);
  }

  function deleteGame() {
    player = "";
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

});
