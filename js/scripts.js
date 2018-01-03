$(document).ready(function() {

  // Defaults on load ================================================
  var currentGame;
  $("#gameInProgressContainer").hide();
  $("#resetButton").hide();

  // Player Select / Game create =====================================
  $("#chooseXButton").click(function() {
      $("#choosePlayerContainer").hide();
      $("#gameInProgressContainer").show();
      $("#resetButton").show();
      currentGame = new Game("X");
  });

  $("#chooseOButton").click(function() {
      $("#choosePlayerContainer").hide();
      $("#gameInProgressContainer").show();
      $("#resetButton").show();
      currentGame = new Game("O");
  })

  // Gameplay Move ===================================================
  $(".game-cell").click(function() {
      addMove(currentGame, $(this).attr('id'));
      $(this).html(currentGame.player);
      console.log(currentGame.moves);
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
      this.moves = [];
      this.gameOver = false;
  }

  function addMove(game, move) {
    game.moves.push(move);
  }

  function deleteGame(game) {
    delete game.player;
    delete game.moves;
    delete game.gameOver;
    $(".game-cell").html("");
  }

});
