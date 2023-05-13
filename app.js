const form = document.querySelector('.quiz-form')
const containerFinalScore = document.querySelector('.container-final-score')
const correctAnswers = ['B', 'C', 'B', 'A', 'D', 'A', 'D', 'C', 'D', 'B']
const maximumScore = 100

let score = 0

const getUserAnswers = () => {
    let userAnswers = []

    correctAnswers.forEach((_, index) => {
        const userAnswer = form[`inputQuestion${index + 1}`].value
        userAnswers.push(userAnswer)
    })
    return userAnswers
}

const calculateScore = (userAnswers) => {
    const incrementedScore = (userAnswer, index) => {
        const isCorrectUserAnswer = userAnswer === correctAnswers[index]
        if (isCorrectUserAnswer) {
            score += maximumScore / correctAnswers.length
        }
    }
    userAnswers.forEach(incrementedScore)
}

const animationFinalScore = () => {
    containerFinalScore.classList.remove('d-none')
    let counter = 0
    const timer = setInterval(() => {
        if (counter === score) {
            clearInterval(timer)
        }
        containerFinalScore.querySelector('span').textContent = `${counter++}%`
    }, 20);

    scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    })
    highScoreAnimation()
}

const highScoreAnimation = () => {
    const isTopScore = score === maximumScore
    if (isTopScore) {
        setTimeout(() => {
            containerFinalScore.querySelector('.gif').classList.remove('d-none')
        }, 2100);
    }
    containerFinalScore.querySelector('.gif').classList.add('d-none')
}

form.addEventListener('submit', event => {
    event.preventDefault()
    score = 0

    const userAnswers = getUserAnswers()
    calculateScore(userAnswers)
    animationFinalScore()
})