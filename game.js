var gamePattern = [];
var userPattern = [];
var continuePlaying = true;
var level = 0;
var buttonsColor = ["red", "blue", "green", "yellow"];
var randomChosenColor = "";

// Start game with a keypress or click
$("body").keypress(function(event) {
    if (level === 0) {  // Only start the game on the first keypress
        nextSequence();
    }
});

// Handler function to listen for user input
$(".btn").click(function() {
    if (!continuePlaying) return;  // Don't respond to clicks if game over

    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);  // Add chosen color to userPattern
    animatePress(userChosenColor);
    animationAndSound(userChosenColor);

    // Check user's answer
    continuePlaying = checkAnswer(userPattern.length - 1);

    if (continuePlaying && userPattern.length === gamePattern.length) {
        // Move to the next sequence after user has completed the current sequence
        setTimeout(nextSequence, 1000);
    }
});

function nextSequence() {
    if (continuePlaying) {
        level += 1;
        userPattern = [];  // Clear user pattern for the new round
        $("h1").html("Level " + level);

        var randomNum = Math.floor(Math.random() * 4);
        randomChosenColor = buttonsColor[randomNum];
        gamePattern.push(randomChosenColor);  // Add the new color to gamePattern
        animationAndSound(randomChosenColor);
    }
}

function animationAndSound(buttonColor) {
    $("#" + buttonColor).fadeOut(120).fadeIn(120);
    var audio = new Audio("sounds/" + buttonColor + ".mp3");
    audio.play();
}

function animatePress(buttonColor) {
    $("#" + buttonColor).addClass("pressed");
    setTimeout(() => {
        $("#" + buttonColor).removeClass("pressed");
    }, 80);
}

function checkAnswer(turn) {
    if (userPattern[turn] === gamePattern[turn]) {
        return true;  // Continue if correct
    } else {
        // Game over logic
        $("h1").html("Game Over! You reached Level " + level);
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        // Reset game after game over
        resetGame();
        return false;
    }
}

function resetGame() {
    level = 0;
    gamePattern = [];
    continuePlaying = true;  // Set this to `true` for next game
}

