let shuffled = [];
let index = 0
let score = 0
let userAnswers = []
let currentData = []
let gameEnd = false

const prv = document.getElementById("prv");
const result = document.getElementById("result");
const prvWrap = document.querySelector(".prv-wrap");
const nxt = document.getElementById("nxt");
const resultBody = document.getElementById("result-body");
const scoreHead = document.getElementById("score-head");
const card = document.querySelector(".card");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const quiz = document.getElementById("quiz");
const homeBtn = document.querySelector("#home a");
const clkSound = new Audio('/assets/audio/matthewvakaliuk73627-mouse-click-290204.mp3')
const liSound = new Audio('/assets/audio/ksjsbwuil-digital-click-3-513897.mp3')
const finSound = new Audio('/assets/audio/dragon-studio-crowd-cheer-and-applause-406644 (1).mp3')

const params = new URLSearchParams(window.location.search);
const quizName = params.get("quiz");

if (quizName) {
  loadQuiz(quizName)
}

async function loadQuiz(subject) {
  const response = await fetch(`./data/${subject}.json`);
  const quiz = await response.json()

  startQuiz(quiz)
}

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const sound = (snd) => {
  snd.currentTime = 0
  snd.play();
}

const startQuiz = (quiz) => {
    h1.textContent = quiz.title
    currentData = quiz.questions
    // Shuffles the questions array reducing them to 5.
    shuffled = [...quiz.questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }))
    update()
}

// Let the user replay the same subject instead of going back to home
const replay = () => {
    index = 0;
    score = 0;
    userAnswers = [];
    gameEnd = false;

    quiz.hidden = false
    result.hidden = true

    resultBody.innerHTML = ""
    scoreHead.textContent = "";

    prv.textContent = "Prev"
    // prv.style.display = "block"
    nxt.textContent = "Next"
    shuffled = [...currentData].sort(() => Math.random() - 0.5).slice(0, 5);
    update();
}

const update = () => {
  h2.textContent = `${index + 1}. ${shuffled[index].question}`;
  quiz.innerHTML = ""

  nxt.disabled = true;
  shuffled[index].options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.classList.add("options")
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio"
    input.name = "answer"
    input.value = i
    const text = document.createElement("span");
    text.textContent = opt

    if(userAnswers[index] === opt) {
      input.checked = true
      nxt.disabled = false
    }
    // listens for when an option has been check and disables the next button
    input.addEventListener("change", () => {
      userAnswers[index] = opt
      nxt.disabled = false
    })
    console.log("userAnswers", userAnswers)
    label.append(input, text);
    li.appendChild(label);
    quiz.appendChild(li);

    li.addEventListener("click", () => sound(liSound))
  })

  prv.disabled = index === 0;
  prvWrap.classList.toggle('hidden', index === 0)
}

const calculateScore = () => {
  gameEnd = true
  prvWrap.classList.remove("hidden");
  prv.textContent = "Home"
  
  nxt.textContent = "Replay";

  quiz.hidden = true
  result.hidden = false

  score = 0
  shuffled.forEach((question, i) => {
    // Correct answer increments score
    const correct = userAnswers[i] === question.answer
    if (correct){
      score++
    }

    const tr = document.createElement("tr");
    const colOne = document.createElement("td");
    const colTwo = document.createElement("td");
    colOne.textContent = `${i + 1}. ${question.question}`
    colTwo.textContent = `${correct ? "Correct": "Incorrect"}`
    colOne.style.color = correct ? "greenyellow" : "red";
    colTwo.style.color = correct ? "greenyellow" : "red";
    colTwo.style.textAlign = "right";
    resultBody.appendChild(tr)
    tr.append(colOne, colTwo)
  })
  
  const allCorrect = score === shuffled.length
  const percentage = (score / shuffled.length) * 100
  h2.textContent = `Quiz Complete!`;
  scoreHead.textContent = allCorrect ? `Perfect Score!!!` : `You scored ${score}/${shuffled.length}.`
  scoreHead.style.color = "#fff"
  scoreHead.style.margin = "16px 0"
  result.prepend(scoreHead)
  
  if (percentage >= 80) {
    sound(finSound)
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  }
}

prv.addEventListener("click", () => {
  if (gameEnd) {
    location.href = "index.html"
  }
  if (index > 0){
    index--
    update()
  }
})

nxt.addEventListener("click", () => {
    nxt.classList.add("flash")
    card.classList.add("flash")
  setTimeout(() => {
    nxt.classList.remove("flash")
    card.classList.remove("flash")
  }, 250);

  if (gameEnd) {
    replay()
    return
  }
  if (index < shuffled.length - 1){
    index++
    update()
  } else {
    calculateScore()
  }
})

const buttons = document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => sound(clkSound))
})

// homeBtn.addEventListener("mouseover", () => {
//     homeBtn.textContent = "Home"
// })

// homeBtn.addEventListener("mouseout", () => {
//     homeBtn.innerHTML = <i class="fa-solid fa-house"></i>
// })