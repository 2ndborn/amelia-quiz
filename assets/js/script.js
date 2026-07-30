const geography = {
    title: "Geography",
    questions: [
        {
            question: "What is the capital of Jamaica?",
            options: ["Kingston", "St. James", "Montego Bay", "St. Elizabeth"],
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
}

let shuffled = [];
let index = 0
let score = 0
let userAnswers = []
let currentData = []
let gameEnd = false

const prv = document.getElementById("prv");
const prvWrap = document.querySelector(".prv-wrap");
const nxt = document.getElementById("nxt");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const ol = document.querySelector("ol");
const scoreSpan = document.createElement("span");
// scoreSpan.textContent = score

const startQuiz = (quiz) => {
    h1.textContent = quiz.title
    currentData = quiz.questions
    document.getElementById("overlay").classList.add("remove")
    // Shuffles the questions array reducing them to 5.
    shuffled = [...quiz.questions].sort(() => Math.random() - 0.5).slice(0, 5);
    update()
}

// Let the user replay the same subject instead of going back to home
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
    li.classList.add("options")
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio"
    input.name = "answer"
    input.value = i
    const text = document.createElement("span");
    text.textContent = opt

    if(userAnswers[index] === i) {
      input.checked = true
      nxt.disabled = false
    }
    // listens for when an option has been check and disables the next button
    input.addEventListener("change", () => {
      userAnswers[index] = i
      nxt.disabled = false
      // const checked = document.querySelector("input[type='radio']:checked")
      // nxt.disabled = !checked
    })
    console.log("userAnswers", userAnswers)
    label.append(input, text);
    li.appendChild(label);
    ol.appendChild(li);
  })

  prv.disabled = index === 0;
  prvWrap.classList.toggle('hidden', index === 0)
}

// const checkScore = () => {
//   const selected = document.querySelector("input[name='answer']:checked");
//   // Selected value is converted to a number and store in userAnswer[index]
//   userAnswers[index] = Number(selected.value)
//   // console.log("X", userAnswers)
// }

const calculateScore = () => {
  gameEnd = true
  
  prvWrap.classList.add('hidden')
  nxt.textContent = "Replay";

  ol.innerHTML = ""
  score = 0
  shuffled.forEach((question, i) => {
    // Define correct the users answer is the same as actual answer
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
  scoreSpan.textContent = `You scored ${score}/${shuffled.length}.`;
  scoreSpan.style.color = "#fff"
  h2.after(scoreSpan)
}

prv.addEventListener("click", () => {
  if (gameEnd) {
    prvWrap.classList.add('hidden')
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
  // checkScore()
  if (index < shuffled.length - 1){
    index++
    update()
  } else {
    calculateScore()
  }
})