var root = document.getElementById("root");
var questionCount = document.getElementById("questionCount");
var question = document.getElementById("question");
var options = document.getElementById("options");
var main = document.getElementById("main");
var result = document.getElementById("result");
var progressBar = document.getElementById("progressBar");
var timer = document.getElementById("timer");

var questionData = [
  //QUESTIONS ARRAY
  {
    question: "What is the Full Form Of HTML",
    options: [
      "HyperText Makeup Language",
      "HyperText Markup Language",
      "HyperText Markup Lame",
      "HyperTate Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answer: "a",
    options: ["link", "href", "a", "hyperlink"],
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answer: "br",
    options: ["break", "lb", "newline", "br"],
  },
  {
    question:
      "Which attribute is used to specify an image's alternative text in HTML?",
    answer: "alt",
    options: ["title", "src", "alt", "description"],
  },
  {
    question: "What does CSS stand for in web development?",
    answer: "Cascading Style Sheets",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Custom Style Sheets",
    ],
  },
  {
    question:
      "Which HTML element is used to define the structure of a web page?",
    answer: "DOCTYPE",
    options: ["html", "body", "header", "DOCTYPE"],
  },
  {
    question: "What is the purpose of the <head> element in an HTML document?",
    answer: "To provide metadata and link to external resources",
    options: [
      "To define the main content of the page",
      "To create a navigation menu",
      "To provide metadata and link to external resources",
      "To display the page footer",
    ],
  },
  {
    question: "Which HTML tag is used to create an ordered list?",
    answer: "ol",
    options: ["ul", "li", "orderlist", "ol"],
  },
  {
    question: "What is the correct HTML element for defining important text?",
    answer: "strong",
    options: ["bold", "important", "emphasis", "strong"],
  },
  {
    question: "In HTML, which tag is used to define a table row?",
    answer: "tr",
    options: ["table", "row", "td", "tr"],
  },
  {
    question: "What is the purpose of the HTML <meta> tag?",
    answer: "To provide metadata about the document",
    options: [
      "To create links to other web pages",
      "To define the page title",
      "To provide metadata about the document",
      "To style text and elements",
    ],
  },
  {
    question: "What does PHP stands for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    question: "What does SQL stands for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    question: "What year was JavaScript launched?",
    answer: "1995",
    options: ["1996", "1995", "1994", "None of the Above"],
  },
  {
    question: "Which tag is used for inserting the largest heading in HTML?",
    answer: "h1",
    options: ["h2", "h3", "h1", "h4"],
  },

  {
    question: "Which HTML element is used to create an unordered list?",
    answer: "ul",
    options: ["ol", "li", "ul", "dl"],
  },
  {
    question: "What does the <a> tag in HTML stand for?",
    answer: "Anchor",
    options: ["Access", "Attach", "Anchor", "Action"],
  },
  {
    question: "Which HTML tag is used to define an image?",
    answer: "img",
    options: ["img", "image", "picture", "src"],
  },
  {
    question: "What is the purpose of the HTML 'div'  element?",
    answer: "Grouping and styling content",
    options: [
      "Creating hyperlinks",
      "Defining headings",
      "Grouping and styling content",
      "Adding images",
    ],
  },
];

var currentQuestion = 0;
var score = 0;

var setIntervalFunc;
var intervalMinutes = 3;
var intervalSeconds = 0;

function progressFunc() {
  var percentage = ((currentQuestion * 100) / questionData.length).toFixed(2);
  progressBar.innerHTML = "";
  progressBar.innerHTML = `<div
  class="progress-bar progress-bar-striped bg-dark" 
  role="progressbar"
  style="width: ${percentage}%"
  aria-valuenow="${percentage}"
  aria-valuemin="0"
  aria-valuemax="100"
></div>`;
}

function timerFunction() {
  if (intervalSeconds > 0) {
    intervalSeconds--;
    timer.innerHTML = `Time left: ${intervalMinutes}:${intervalSeconds}`;
  } else if (intervalMinutes > 0 && intervalSeconds === 0) {
    intervalMinutes--;
    intervalSeconds = 59;
    timer.innerHTML = `Time left: ${intervalMinutes}:${intervalSeconds}`;
  } else {
    clearInterval(setIntervalFunc);
    renderResult();
    console.log("Countdown finished.");
  }
}

function startTimer() {
  setIntervalFunc = setInterval(timerFunction, 1000);
}

function startDiv() {
  root.innerHTML = "";
  root.innerHTML = `
  <div id="startDiv" class="container p-5 my-5 section-1">
        <h1 class="my-5 heading-1 text-center">HTML QUIZ</h1>

        <div>
          <div class="row mb-4">
            
            <div class="col-6 h4 ">
              No. of Questions:
              <span class="badge rounded-pill badge-primary px-5">${questionData.length}</span>
            </div>
            <div class="col-6 h4 text-end">
              Time allowed:
              <span class="badge rounded-pill badge-primary">3 minutes</span>
            </div>
          </div>
        </div>
        <button class="btn btn-secondary btn-lg w-100 line-height-3 animate__animated animate__fadeInUp" type="button" onclick="startQuiz(); startTimer();">Start</button>
      </div>
  `;
}

startDiv();

function startQuiz() {
  main.style.display = "block";
  root.style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  if (questionData.length > currentQuestion) {
    questionCount.innerHTML = `${currentQuestion + 1} of ${
      questionData.length
    }`;
    question.innerHTML = questionData[currentQuestion].question;
    progressFunc();
    renderOptions();
  } else {
    clearInterval(setIntervalFunc);
    renderResult();
  }
}

function renderOptions() {
  options.innerHTML = "";

  for (var i = 0; i < questionData[currentQuestion].options.length; i++) {
    options.innerHTML += `
    <div class="col-md-6 p-3">
            <button onclick="checkAns('${questionData[currentQuestion].options[i]}', '${questionData[currentQuestion].answer}')" type="button" class="custom-btn">
            ${questionData[currentQuestion].options[i]}
            </button>
          </div>`;
  }
}

function nextQuestion() {
  currentQuestion++;
  startQuiz();
}

function checkAns(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
  } else {
  }
  nextQuestion();
}

function renderResult() {
  main.style.display = "none";
  result.style.display = "block";
  var percentage = ((score * 100) / questionData.length).toFixed(2);

  result.innerHTML = `
  <div id="resultDiv" class="container p-5 my-5 section-1 ">
  <h3 class="my-5 heading-1 text-center">HTML QUIZ RESULT</h1>
        <div class="row">
          <div class="col-6 animate__animated animate__bounceInLeft">
            <h3>Correct: <span class="badge rounded-pill badge-primary px-5">${score}</span></h3>
          </div>
          <div class="col-6 text-end animate__animated animate__bounceInDown">
          
          <h3>You got: <span class="badge rounded-pill badge-primary px-5">${percentage}%</span></h3>
          </div>
        </div>
        <button class="btn btn-secondary btn-lg mt-5" type="button" onclick="retakeQuiz();">Retake</button>
      </div>`;
}

function retakeQuiz() {
  let timerInterval;
  Swal.fire({
    title: "Regenerating Questions!",
    html: "Please wait. It will loaded in <b></b> milliseconds.",
    timer: 4000,
    allowEscapeKey: false,
    allowOutsideClick: false,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      result.style.display = "none";
      root.style.display = "block";
      currentQuestion = 0;
      score = 0;
      intervalMinutes = 3;
      intervalSeconds = 0;
      timer.innerHTML = `Time left: ${intervalMinutes}:${intervalSeconds}`;
      startDiv();
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });

  // result.style.display = "none";
  // root.style.display = "block";
  // currentQuestion = 0;
  // score = 0;
  // intervalMinutes = 3;
  // intervalSeconds = 0;
  // timer.innerHTML = `Time left: ${intervalMinutes}:${intervalSeconds}`;
  // startDiv();
}
