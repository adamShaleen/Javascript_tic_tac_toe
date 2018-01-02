$(document).ready(function() {

  // Defaults on load=====================
  $("#gameInProgressContainer").hide();

  // Player select
  $("#choosePlayerContainer").click(function() {
    $(this).hide();
    $("#gameInProgressContainer").show();
  });

  // Reset Game
  $("#resetButton").click(function() {
    $("#gameInProgressContainer").hide();
    $("#choosePlayerContainer").show();
  });

});
