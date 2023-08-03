const StartButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElements = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
const questions = [
    {
        question: 'What is 2 + 2 boss man?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]
StartButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    StartButton.classList.add('hide')
    // Generates random question for recipient.
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Reveal question after trial has begun.
function showQuestion(question) {
    // Put question on the page.    
    questionElement.innerText = question.question
    //Put answers on the page.
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn');
        button.dataset.correct = answer.correct

        button.addEventListener('click', selectAnswer)
        //Finalize button property so that the questionnaire can begin.
        answerButtonsElements.appendChild(button);
    }
    )


}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElements.firstChild) {
        answerButtonsElements.removeChild(answerButtonsElements.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct
    setStatusClass(document.body, isCorrect)
    console.log(isCorrect)
    Array.from(answerButtonsElements.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')    
    } else {
        StartButton.innerText = 'Restart'
        StartButton.classList.remove('hide')

    }
    
 
    function setStatusClass(element, isCorrect) {
        clearStatusClass(element)
        if(isCorrect) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }
    
                   
    // if (question.answers[0]); {
    //     button.dataset.correct = answers.correct
    // }   
}



   
   






