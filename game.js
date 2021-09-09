// Variables
var colores = ["red", "blue", "green", "yellow"];

var patronColores = [];

var patronUsuarioColores = [];

var start = false;

var level = 0;

// jQuery
$(document).keypress(function() {
  if (!start) {
    siguienteSecuencia();
    start = true;
  }
});

$(".btn").click(function() {

  var colorUsuarioElegido = $(this).attr("id");
  patronUsuarioColores.push(colorUsuarioElegido);

  playSound(colorUsuarioElegido);
  animatePress(colorUsuarioElegido);

  checkAnswer(patronUsuarioColores.length - 1);

});

// JavaScript
function siguienteSecuencia() {
  patronUsuarioColores = [];
  level++;
  $("#level-title").text("Level: " + level);

  var numeroAleatorio = Math.floor(Math.random() * 4);
  var colorAleatorio = colores[numeroAleatorio];
  patronColores.push(colorAleatorio);

  $("#" + colorAleatorio).fadeOut(100).fadeIn(100);

  playSound(colorAleatorio);
}

function animatePress(colorUsuario) {

  $("#" + colorUsuario).addClass("pressed");
  setTimeout(function() {
    $("#" + colorUsuario).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (patronColores[currentLevel] === patronUsuarioColores[currentLevel]) {
    if (patronUsuarioColores.length === patronColores.length) {
      setTimeout(function() {
        siguienteSecuencia();
      }, 1000);
    }
  } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over: Prees Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000);

      gameOver();
  }
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function gameOver() {
  level = 0;
  start = false;
  patronColores = [];
}
