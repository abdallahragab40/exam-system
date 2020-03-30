// Register Screen

$(".input input").on("focus", function() {
  $(this).addClass("focus");
});

$(".input input").on("blur", function() {
  if ($(this).val() == "") $(this).removeClass("focus");
});

/******************************************
 * Exam Page
 */

// Question Function Constructor

var Question = function(
  ID,
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correct
) {
  this.ID = ID;
  this.question = question;
  this.answer1 = answer1;
  this.answer2 = answer2;
  this.answer3 = answer3;
  this.answer4 = answer4;
  this.correct = correct;
};

// Questions

var q1 = new Question(
  1,
  "Find the word whose underlined part is pronounced differently from the others?",
  "fight",
  "high",
  "figure",
  "bright",
  2
);

var q2 = new Question(
  2,
  "Almost everyone ______ for home by the time we arrived.",
  "leave",
  "left",
  "leaves",
  "had left",
  1
);

var q3 = new Question(
  3,
  "What does best describe coding ?",
  "boring",
  "hard",
  "fun",
  "curiuos",
  2
);

var q4 = new Question(
  4,
  "I'm going out ______ some cigarettes.",
  "to buying",
  "to buy",
  "for buying",
  "for to buy",
  1
);

var q5 = new Question(
  5,
  "Have you finished the shopping ______ ?",
  "already",
  "still",
  "now",
  "yet",
  3
);

var q6 = new Question(
  6,
  "I'm really looking forward ______ this exercise.",
  "to finish",
  "finishing",
  "to finish",
  "to finishing",
  0
);

// Generate Array of Questions

function generateQuestions(arr, num) {
  var randQues = [];
  var random,
    id = 1;
  while (randQues.length < num) {
    random = Math.floor(Math.random() * arr.length);
    if (randQues.indexOf(arr[random]) === -1) {
      arr[random].ID = id++;
      randQues.push(arr[random]);
    }
  }
  return randQues;
}

var questions = [q1, q2, q3, q4, q5, q6];
var examQuestion = generateQuestions(questions, 5);

// Exam Controller
var examController = (function() {
  var data = {
    list: {
      ques: [],
      ans: [],
      unsolved: []
    },
    time: 0
  };

  return {
    setTime: function(Time) {
      data.time = Time;
    },
    addQues: function(quest) {
      data.list.ques.push(quest);
    },
    addAns: function(answ) {
      var answers = data.list.ans;
      id = -1;
      for (var i = 0; i < answers.length; i++) {
        if (answers[i].qID == answ.qID) {
          id = i;
          break;
        }
      }
      if (id == -1) {
        data.list.ans.push(answ);
      } else {
        answers[id].qAns = answ.qAns;
      }
    },
    isunSolve: function(qID) {
      return data.list.unsolved.indexOf(qID);
    },
    isSolve: function(qID) {
      var answer = data.list.ans;
      var answ = -1;
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].qID == qID) {
          answ = answer[i].qAns;
          break;
        }
      }
      return answ;
    },
    addunsolve: function(qID) {
      if (this.isunSolve(qID) > -1) {
        return false;
      } else {
        data.list.unsolved.push(qID);
        return true;
      }
    },
    unsolveCount: function() {
      return data.list.unsolved.length;
    },
    removeunsolve: function(qID) {
      var id = this.isunSolve(qID);
      if (id > -1) {
        data.list.unsolved.splice(id, 1);
        return true;
      } else {
        return false;
      }
    },
    getQues: function(qID) {
      var quest = data.list.ques;
      var idd = quest.map(function(currrent) {
        return currrent.ID;
      });
      var idx = idd.indexOf(qID);
      return quest[idx];
    },
    getRes: function() {
      var answ = data.list.ans;
      var sum = 0;
      for (var i = 0; i < answ.length; i++) {
        var ques = this.getQues(parseInt(answ[i].qID));
        if (ques.correct == answ[i].qAns) {
          sum += 1;
        }
      }
      return sum;
    }
  };
})();

// UI Controller
var UIController = (function() {
  return {
    displayQuestion(ques, answerId) {
      var Answers = document.querySelectorAll(".radio input");
      var Labels = document.querySelectorAll(".radio label");
      document.querySelector(".question").id = ques.ID;
      document.querySelector(".quesNo").textContent = "Question No." + ques.ID;
      document.querySelector(".questionName").textContent = ques.question;
      for (var i = 0; i < Answers.length; i++) {
        Answers[i].value = i;
        if (i == answerId) {
          Answers[i].checked = true;
        } else {
          Answers[i].checked = false;
        }
      }
      for (var i = 0; i < Answers.length; i++) {
        Labels[i].textContent = ques["answer" + (i + 1)];
      }
    },
    addunSolve: function(qID, count) {
      document.querySelector(".mark > ul").innerHTML +=
        "<li class='mark__quest' id='un-" +
        qID +
        "' onclick='controller.unSolvedHandler(" +
        qID +
        ")'>Question No." +
        qID +
        "</li>";
      document.querySelector(".count").textContent = count;
    },
    addSkip: function(qID, count) {
      document.querySelector(".mark > ul").innerHTML +=
        "<li class='mark__quest' id='un-" +
        qID +
        "' onclick='controller.unSolvedHandler(" +
        qID +
        ")'>Question No." +
        qID +
        "</li>";
      document.querySelector("count").textContent = count;
    },
    removeunsolve: function(qID, count) {
      var unSolvedQ = document.getElementById("un-" + qID);
      unSolvedQ.parentNode.removeChild(unSolvedQ);
      document.querySelector("count").textContent = count - 1;
    },
    enableNext: function() {
      document.querySelector("#fns__btn").style.display = "none";
      document.querySelector("#nxt__btn").style.display = "block";
    },
    enableFinish: function() {
      document.querySelector("#nxt__btn").style.display = "none";
      document.querySelector("#fns__btn").style.display = "block";
    },
    enablePrevious: function() {
      document.querySelector("#prv__btn").style.display = "block";
    },
    disablePrevious: function() {
      document.querySelector("#prv__btn").style.display = "none";
    },
    stopTimer: function() {
      document.querySelector(".timer").textContent = "";
    },
    showUnsolved: function() {
      document.querySelector(".mark").style.opacity = 1;
    },
    hideUnsolved: function() {
      document.querySelector(".mark").style.opacity = 0;
    },
    passExam: function(result, time) {
      document.querySelector(".content").style.display = "none";
      document.querySelector(".result").style.display = "block";
      document.querySelector(".result .score").textContent =
        "congratulations, Your score is : " + result + " % ";
      document.querySelector(".result .time").textContent =
        "Time taken is " + time.min + ":" + time.sec + " (min)";
    },
    failExam: function(result, time) {
      document.querySelector(".content").style.display = "none";
      document.querySelector(".result").style.display = "block";
      document.querySelector(".result").querySelector(".score").textContent =
        "Failed!, Your score is : " + result + " % ";
      document.querySelector(".result").querySelector(".time").textContent =
        "Time taken is " + time.min + ":" + time.sec + " (min)";
    }
  };
})();

// Full App Controller
var controller = (function(examCtrl, UICtrl) {
  var currentQues = 0;

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

      if (minutes == 0) {
        document.querySelector(".timer").classList.add("finishing");
      }

      if (distance < 0) {
        captureQuestion();
        finishE(examTime, 0);
        clearInterval(x);
        timer.textContent = "Time out";
      }
    }, 1000);
  };

  var nextQuestion = function(count) {
    UICtrl.enablePrevious();
    if (currentQues + 1 < count) {
      currentQues++;
    }
    if (currentQues == count - 1) {
      UICtrl.enableFinish();
    }
  };

  var prevQuestion = function() {
    UICtrl.enableNext();
    if (currentQues > 0) {
      currentQues--;
    }
    if (currentQues == 0) {
      UICtrl.disablePrevious();
    }
  };

  var captureQuestion = function() {
    var questionID = document.querySelector(".question").id;
    var answers = document.getElementsByName("answer");
    var answer = -1;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        answer = answers[i].value;
        break;
      }
    }
    var unsolvedCount = examCtrl.unsolveCount();
    if (answer > -1) {
      examCtrl.addAns({ qID: questionID, qAns: answer });
      if (examCtrl.removeunsolve(questionID)) {
        UICtrl.removeunsolve(questionID, unsolvedCount);
      }
    } else {
      if (examCtrl.addunsolve(questionID)) {
        UICtrl.addunSolve(questionID, unsolvedCount + 1);
      }
    }
    unsolvedCount = examCtrl.unsolveCount();
    if (unsolvedCount > 0) {
      UICtrl.showUnsolved();
    } else {
      UICtrl.hideUnsolved();
    }
  };

  var finishE = function(minutes, seconds) {
    var result = (examCtrl.getRes() / examQuestion.length) * 100;
    result = Math.ceil(result);
    if (result >= 50) {
      UICtrl.passExam(result, { min: minutes, sec: seconds });
    } else {
      UICtrl.failExam(result, { min: minutes, sec: seconds });
    }
    UICtrl.stopTimer();
  };

  return {
    init: function(examQuestion, time) {
      setTimer(time);
      examCtrl.setTime(time);

      examQuestion.forEach(function(q) {
        examCtrl.addQues(q);
      });

      UICtrl.displayQuestion(examQuestion[currentQues], examQuestion.length);

      document.querySelector("#nxt__btn").addEventListener("click", function() {
        captureQuestion();
        nextQuestion(examQuestion.length);
        UICtrl.displayQuestion(
          examQuestion[currentQues],
          examCtrl.isSolve(examQuestion[currentQues].ID)
        );
      });

      document.querySelector("#prv__btn").addEventListener("click", function() {
        captureQuestion();
        prevQuestion();
        UICtrl.displayQuestion(
          examQuestion[currentQues],
          examCtrl.isSolve(examQuestion[currentQues].ID)
        );
      });

      document.querySelector("#fns__btn").addEventListener("click", function() {
        captureQuestion();
        var unSolvedCount = examCtrl.unsolveCount();
        var Finish = true;
        if (unSolvedCount > 0) {
          Finish = confirm(
            "You have unsolved question(s), Are you sure to Finish"
          );
        }
        if (Finish) {
          clearInterval(x);
          finishE(time - minutes - 1, 60 - seconds);
        }
      });
    },
    unSolvedHandler: function(qID) {
      captureQuestion();
      if (currentQues == examQuestion.length - 1) {
        UICtrl.enableNext();
      }
      if (qID == 1) {
        UICtrl.disablePrevious();
      }
      var Q = examCtrl.getQues(qID);
      UICtrl.displayQuestion(Q, -1);
    }
  };
})(examController, UIController);
controller.init(examQuestion, 2);
