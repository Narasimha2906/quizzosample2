const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [

    {
  
      question: ' Name the weapon used by Lord Rama to kill Ravana in the battle fought at Lanka?',
  
        choice1: 'Pashupastra', 
  
        choice2: 'Brahmastra',   
        choice3: 'Nagastra', 
  
        choice4: 'Shastra',
        answer: 2,  
      
  
    },
  
    {
        question: 'Dussehra puja lasts how many days?',
  
        choice1: '4 days', 
  
        choice2: '6 days',   
        choice3: '9 days', 
  
        choice4: '10 days',
        answer: 3,  
      
    },
    {
        question: 'Various names of Ravana are:',
  
        choice1: ' Dasamukha', 
  
        choice2: 'Dasahaanan',   
        choice3: 'Lankeshwar', 
  
        choice4: 'All of the above',
        answer: 4,  
      
    },
    {
        question: 'Name of Ravana Parents:',
  
        choice1: 'Visravasa', 
  
        choice2: 'Kaikasi',   
        choice3: 'Both A and B', 
  
        choice4: 'None of the above',
        answer: 3,  
      
    },
    {
        question: 'What is the name of book that Ravana written on astrology',
  
        choice1: 'Ravana Sanhita', 
  
        choice2: 'Tantra Shastra',   
        choice3: 'Shani Sanhita', 
  
        choice4: 'None of the above',
        answer: 1,  
      
    },
    {
        question: ' In which state of India, Dussehra festival is celebrated with the parade of elephants?',
  
        choice1: 'Uttarakhand', 
  
        choice2: 'Uttar Pradesh',   
        choice3: 'Karnataka', 
  
        choice4: 'Tamil Nadu',
        answer: 3,  
      
    }]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentscore', score)
        
        return window.location.assign('/end.html')

    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click' , e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
  






