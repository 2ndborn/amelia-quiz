const questions = [
  {
    question: "What is the capital of Jamaica?",
    options: ["Kingson", "St. James", "Montego Bay", "St. Elizabeth"],
    answer: 0
  },
  {
    question: "What is the capital of Italy?",
    options: ["Naples", "Turin", "Milan", "Rome"],
    answer: 3
  },
  {
    question: "What is the capital of Japan?",
    options: ["Okinawa", "Tokyo", "Fukushima", "Hokkaido"],
    answer: 1
  },
  {
    question: "What is the capital of Brazil?",
    options: ["Salvador", "Sao Paulo", "Rio de Janeiro", "Brasilia"],
    answer: 3
  },
  {
    question: "What is the capital of Ghana?",
    options: ["Sekondi-Takoradi", "Accra", "Kumasi", "Tamale"],
    answer: 1
  },
  {
    question: "What is the capital of Portugal?",
    options: ["Lisbon", "Porto", "Braga", "Coimbra"],
    answer: 0
  },
  {
    question: "What is the capital of Mali?",
    options: ["Sikasso", "Segou", "Timbuktu", "Bamako"],
    answer: 3
  },
  {
    question: "What is the capital of Guyana?",
    options: ["Linden", "Georgetown", "New Amsterdam", "Rose Hall"],
    answer: 1
  },
  {
    question: "What is the capital of Canada?",
    options: ["Ottawa", "Alberta", "Quebec", "Ontario"],
    answer: 0
  },
  {
    question: "What is the capital of India?",
    options: ["Chennai", "New Delhi", "Mumbai", "Hyderabad"],
    answer: 1
  },
]

let shuffled = [];
let index = 0
let score = 0
let userAnswers = []
let currentData = []
let gameEnd = false

// const startBtn = document.getElementById("startBtn");
const prv = document.getElementById("prv");
const nxt = document.getElementById("nxt");
const h2 = document.querySelector("h2");
const ol = document.querySelector("ol");
const span = document.createElement("span");
span.textContent = score

const startQuiz = (data) => {
    currentData = data
    document.getElementById("overlay").classList.add("remove")
    shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 5);
    update()
}

const replay = () => {
    index = 0;
    userAnswers = [];
    gameEnd = false;

    prv.style.display = "block"
    nxt.textContent = "Next"
    shuffled = [...currentData].sort(() => Math.random() - 0.5).slice(0, 5);
    update();
}

const update = () => {
  h2.textContent = `${index + 1}. ${shuffled[index].question}`;
  ol.innerHTML = ""

  nxt.disabled = true;
  shuffled[index].options.forEach((opt, i) => {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.type = "radio"
    input.name = "answer"
    input.value = i

    input.addEventListener("change", () => {
      const checked = document.querySelector("input[type='radio']:checked")
      nxt.disabled = !checked
    })

    label.append(input, ` ${opt}`);
    li.appendChild(label);
    ol.appendChild(li);
  })
//   prv.classList.toggle("remove", index === 0);
  prv.disabled = index === 0;
}

const checkScore = () => {
  const selected = document.querySelector("input[name='answer']:checked");
  
  userAnswers[index] = Number(selected.value)
  console.log(userAnswers)
}

const calculateScore = () => {
  gameEnd = true
  
  prv.style.display = "none";
  nxt.textContent = "Replay";

  ol.innerHTML = ""
  score = 0
  shuffled.forEach((question, i) => {
    const correct = userAnswers[i] === question.answer
    if (correct){
      score++
    }
    const li = document.createElement("li");
    li.textContent = `${question.question} - 
    ${correct ? "Correct": "Incorrect"}`
    ol.appendChild(li);
    li.style.color = correct ? "green" : "red"
  })
  h2.textContent = `Quiz Complete!`;
  span.textContent = `Score: ${score}/${shuffled.length}`;
}

prv.addEventListener("click", () => {
  if (gameEnd) {
    prv.style.display = "none"
  }
  if (index > 0){
    index--
    update()
  }
})

nxt.addEventListener("click", () => {
  if (gameEnd) {
    replay()
    return
  }
  checkScore()
  if (index < shuffled.length - 1){
    index++
    update()
  } else {
    calculateScore()
  }
})