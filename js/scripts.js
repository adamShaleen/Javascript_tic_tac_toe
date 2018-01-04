$(document).ready(function() {

  // Defaults on load ================================================
  var currentGame, availableMoves;
  $("#gameInProgressContainer").hide();
  $("#resetButton").hide();

  // Player Select / Game create =====================================
  $("#chooseXButton").click(function() {
      $("#choosePlayerContainer").hide();
      $("#gameInProgressContainer").show();
      $("#resetButton").show();
      loadAllMoves();
      currentGame = new Game("X");
  });

  $("#chooseOButton").click(function() {
      $("#choosePlayerContainer").hide();
      $("#gameInProgressContainer").show();
      $("#resetButton").show();
      loadAllMoves();
      currentGame = new Game("O");
  })

  // Gameplay Move ===================================================
  $(".game-cell").click(function() {
      if ($("#gameInProgressContainer").is(":visible")) {
          makeMove(currentGame.player, $(this).attr('id'));
          computerAddMove(currentGame);
      }
  });

  // Reset Game ======================================================
  $("#resetButton").click(function() {
    $("#gameInProgressContainer").hide();
    $("#resetButton").hide();
    $("#choosePlayerContainer").show();
    deleteGame(currentGame);
  });

  // Utilities =======================================================

  function Game(player) {
      this.player = player;
      this.gameOver = false;
  }

  function computerAddMove(game) {
      var computer = game.player === "X" ? "O" : "X";
      var computerMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
      makeMove(computer, computerMove);
  }

  function loadAllMoves() {
      availableMoves = ["cell1", "cell2", "cell3", "cell4", "cell5", "cell6", "cell7", "cell8", "cell9"];
  }

  function makeMove(player, move) {
      availableMoves = availableMoves.filter(function(e) { return e !== move} );
      $("#" + move).html(player);
      console.log(availableMoves);
  }

  function deleteGame(game) {
    delete game.player;
    delete game.gameOver;
    $(".game-cell").html("");
  }

});
