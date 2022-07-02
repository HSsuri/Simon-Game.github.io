let buttonColours=['red', "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;



$(document).keypress(function(){
if(!started){
    level++;
    gamePattern=[];
    nextSequence(); 
    started=true;   
}

});

$(".btn").click(function(){
    if(started){
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);}
});


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
     console.log("sucess");
      if (userClickedPattern.length === gamePattern.length)
      { console.log("Level "+level+" cleard!!") ;
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }

    else{ 
        console.log("fail");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
         $("body").removeClass("game-over");
        },200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
    
}

function nextSequence() {

    userClickedPattern = [];

    $("#level-title").text("Level "+level);

    let randomNumber= Math.floor(Math.random()*4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
        
}

function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
       },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started=false;
}
