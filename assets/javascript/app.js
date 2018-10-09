$(document).ready(function () {
    var qArray = [
        {
            question: "Inside which HTML element do we put the JavaScript?", 
            choice: ["scripting", "javascript", "script", "js"],
            answer: 2,
            photo: "assets/images/script.jpg"
         },
         {
             question: "Where is the correct place to insert a JavaScript?", 
            choice: ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section"],
            answer: 0,
            photo: "assets/images/headbody.jpg"
         }, 
         {
             question: "What is the correct syntax for referring to an external script called xxx.js", 
            choice: ["script href=xxx.js", "script src=xxx.js", "script name=xxx.js"],
            answer: 1,
            photo: "assets/images/ext.png"
        }, 
        {
            question: "The external JavaScript file must contain the script tag?", 
            choice: ["true", "false"],
            answer: 1,
            photo: "assets/images/external.jpg"
        }, 
        {
            question: "How do you create a function in JavaScript?", 
            choice: ["function myFunction()", "function:myFunction()", "function = myFunction()"],
            answer: 0,
            photo: "assets/images/fu.png"
        }, 
        {
            question: "How to write an IF statement in JavaScript?", 
            choice: ["if (i == 5)", "if i = 5 then", "if i == 5 then", "if i = 5" ],
            answer: 0,
            photo: "assets/images/if.png"
        }, 
        {
            question: "How does a WHILE loop start?", 
            choice: ["while i = 1 to 10", "while (i <= 10)", "while (i <= 10; i++)"],
            answer: 1,
            photo: "assets/images/while.jpg"
        }, 
        {
            question: "How does a FOR loop start?", 
            choice: ["for i = 1 to 5", "for (i = 0; i <= 5; i++)", "for (i <= 5; i++)", "for (i = 0; i <= 5)"],
            
            answer: 1,
            photo: "assets/images/for.jpg"
        },
        {
            question: "How can you add a comment in a JavaScript?", 
            choice: ["!--This is a comment-->", "'This is a comment", "//This is a comment"],
            
            answer: 2,
            photo: "assets/images/comment.png" 
        },
        {
            question: "How do you round the number 7.25, to the nearest integer?", 
            choice: ["Math.round(7.25)", "for (i = 0; i <= 5; i++)", "Math.rnd(7.25)", "rnd(7.25)", "round(7.25)"],
            
            answer: 0,
            photo: "assets/images/round.png"   
        
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = qArray.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
       
    $("#reset").hide();
    
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < qArray.length; i++) {
        holder.push(qArray[i]);
    }
        })
    
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    

    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    function displayQuestion() {
        
        index = Math.floor(Math.random()*qArray.length);
        pick = qArray[index];
    
    
            $("#question").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
               
                userChoice.attr("data-guessvalue", i);
                $("#answer").append(userChoice);
    
    }
    
    $(".answerchoice").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answer").html("<p1>Correct!</p1>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        qArray.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answer").empty();
            timer= 15;
    
        
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#question").empty();
            $("#question").html("<h5>Game Over! </h5>");
            $("#answer").append("<h4> Correct: " + correctCount + "</h4>"  );
            $("#answer").append("<h6> Incorrect: " + wrongCount + "</h5>" );
            $("#answer").append("<h6> Unanswered: " + unanswerCount + "</h5>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 2000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answer").empty();
        $("#question").empty();
        for(var i = 0; i < holder.length; i++) {
            qArray.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })