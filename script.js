// Register Screen

$(".input input").on("focus", function() {
  $(this).addClass("focus");
});

$(".input input").on("blur", function() {
  if ($(this).val() == "") $(this).removeClass("focus");
});

// Exam Page

// Count down Function

var minutes, seconds, x;
var setTimer = function(examTime) {
  var timer = document.getElementById("time");
  timer.textContent = examTime + ":00";
  var countDownDate = new Date().getTime() + examTime * 1000 * 60;
  x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timer.textContent = minutes + ":" + seconds;

    if (distance < 0) {
      clearInterval(x);
      timer.textContent = "Time out";
    }
  }, 1000);
};
setTimer(5);

// exam

var pos = 0,
  question,
  choice,
  choices,
  answerA,
  answerB,
  answerC,
  answerD,
  correct = 0,
  newArr = [];
var questions = [
  [
    "Almost everyone ______ for home by the time we arrived.",
    "leave",
    "left",
    "leaves",
    "had left",
    "B"
  ],
  [
    "Find the word whose underlined part is pronounced differently from the others?",
    "fight",
    "high",
    "figure",
    "bright",
    "C"
  ],
  [
    "I'm going out ______ some cigarettes.",
    "to buying",
    "to buy",
    "for buying",
    "for to buy",
    "B"
  ],
  [
    "Have you finished the shopping ______ ?",
    "already",
    "still",
    "now",
    "yet",
    "D"
  ],
  [
    "I'm really looking forward ______ this exercise.",
    "to finish",
    "finishing",
    "to finish",
    "to finishing",
    "A"
  ]
];

var random = Math.floor(Math.random() * questions.length);
newArr.push(random);
question = questions[random][0];
answerA = questions[random][1];
answerB = questions[random][2];
answerC = questions[random][3];
answerD = questions[random][4];

//Choose a random question with relative answers from the array

function randomize() {
  do {
    random = Math.floor(Math.random() * questions.length);
  } while (newArr.indexOf(random) !== -1);
  newArr.push(random);
  // while (newArr.indexOf(random) === -1) {
  //
  // }
  question = questions[random][0];
  answerA = questions[random][1];
  answerB = questions[random][2];
  answerC = questions[random][3];
  answerD = questions[random][4];
}

function renderQuestion() {
  if (pos >= questions.length) {
    document.getElementById("test").innerHTML =
      "<br> <h2 > You got " +
      correct +
      " of " +
      questions.length +
      " Questions correct </h2>";
    document.getElementById("test_status").innerHTML = "Exam Finished";
    document.querySelector(".mark").style.display = "none";

    pos = 0;
    correct = 0;
    return false;
  }
  document.getElementById("test_status").innerHTML =
    "Question " + (pos + 1) + " of " + questions.length;

  document.getElementById("test").innerHTML =
    '<h3 class="questionName">' + question + "</h3>";
  document.getElementById("test").innerHTML +=
    '<div class="radio"><input id="radio-1" name="choices" type="radio" value="A" /><label for="radio-1" class="radio-label">' +
    answerA +
    "</label></div>";
  document.getElementById("test").innerHTML +=
    '<div class="radio"><input id="radio-2" name="choices" type="radio" value = "B" /><label for="radio-2" class="radio-label">' +
    answerB +
    "</label></div>";
  document.getElementById("test").innerHTML +=
    '<div class="radio"><input id="radio-3" name="choices" type="radio" value="C" /><label for="radio-3" class="radio-label">' +
    answerC +
    "</label></div>";
  document.getElementById("test").innerHTML +=
    '<div class="radio"><input id="radio-4" name="choices" type="radio" value="D" /><label for="radio-4" class="radio-label">' +
    answerD +
    "</label></div>";

  // check answer
  document.getElementById("test").innerHTML +=
    '<div class="btns"><button class="btn click" onclick ="checkAnswer()">Next</button></div>';
}

function checkAnswer() {
  choices = document.getElementsByName("choices");

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }
  if (choice == questions[random][5]) {
    correct++;
  }
  pos++;
  // questions.splice(random, 1);
  if (newArr.length !== questions.length) {
    randomize();
  }

  renderQuestion();
}

window.addEventListener("load", renderQuestion, false);
