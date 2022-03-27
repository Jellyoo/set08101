const question = document.getElementById('question');                                               /* Stores all questions under an element */
const choices = Array.from(document.getElementsByClassName('choice-text'));                         /* Stores all question answer chocies in an array */
const progressText = document.getElementById("questionCounter");                                    /* Stores Number of questions answered for visual display */
const scoreText = document.getElementById("score");                                                 /* Stores user score for visualisation */
const progressBarFull = document.getElementById("progressBarFull");                                 /* Constant for full bar */



/* ----- VARIABLE DEFINITION ----- */
let currentQuestion = {};                                                                           /* Object stores current question */
let acceptingAnswers = false;                                                                       /* Used to create delay for each time user submits and answer */
let score = 0;                                                                                      /* Stores overall score */
let questionCounter = 0;                                                                            /* Stores current question */
let availableQuesions = [];                                                                         /* Used to store all questions not yet used */





/* ----- ALL QUESTIONS ----- */
/* Each question is stored as an object, */
let questions = [
    {
        question: "Lewis Hamilton won his first Formula 1 World Championship in 2008, but by how many points?",
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 1,
    },
    {
        question:"Lewis Hamilton has won How many championships?",
        choice1: "8",
        choice2: "5",
        choice3: "7",
        choice4: "1",
        answer: 3,
    },
    {
        question: "Which is an official Formula 1 tire compound?",
        choice1: "Ultra Medium",
        choice2: "Super Soft",
        choice3: "Soft",
        choice4: "Super Medium",
        answer: 3,
    },
    {
        question: "2010 saw Nico Hulkenberg grab his first – and to date only – pole position. But where did the German finish the race?",
        choice1: "1st",
        choice2: "3rd",
        choice3: "8th",
        choice4: "He did not finish",
        answer: 3,
    },
    {
        question: "The 2012 European Grand Prix was held at which venue?",
        choice1: "Slverstone",
        choice2: "Imola",
        choice3: "Germany",
        choice4: "Valencia",
        answer: 4,
    },
    {
        question: "Which are previous Formula 1 Teams?",
        choice1: "Force China",
        choice2: "Modena",
        choice3: "Bro GP",
        choice4: "Bennyton GP",
        answer: 2,
    },
    {
        question: "Honda’s F1 team changed name to ____ GP in 2009?",
        choice1: "Brawn",
        choice2: "Honda 2.0",
        choice3: "Power of JapanP",
        choice4: "Bennaton",
        answer: 1,
    },
    {
        question: "Markus ____ had his single Grand Prix outing in the 2007 European GP",
        choice1: "Rashford",
        choice2: "Button",
        choice3: "Perez",
        choice4: "Winkelhock",
        answer: 4,
    },
];





/* ----- CONSTANTS ----- */
const CORRECT_MARK = 1;                                                 /* How many points for a correct answer */
const MAX_QUESTIONS = 8;                                                /* How many questions does a user get  */





/* ----- CALLED TO BEGIN NEW GAME ----- */
startGame = () => {
    questionCounter = 0;                                                /* Reset question counter */
    score = 0;                                                          /* Users score for this game */
    availableQuesions = [...questions];                                 /* [...questions] Takes each item fromt he array and spreads them into a new array (avalible Q's) Copies questions from storage array into live quuiz */
    getNewQuestion();                                                   /* Function  */
};






/* ----- CALLED TO BEGIN NEW QUESTION ----- */
    getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {           /* If questions finished go to the final end hyml page */
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('End.html');                                     /* take to End html page */
    }
    
    
    
    questionCounter++;                                                                  /* Incriment question count from startGame */
    progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;        /* Convert to percentage and display withinn the div */
        
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);         /* Bases index variable on length of avalible questions array */
    currentQuestion = availableQuesions[questionIndex];                                 /* Sets current question to calculated avalible one */
    question.innerText = currentQuestion.question;                                      /* Sets question to the stored text from the array  */
    
    
    
    choices.forEach((choice) => {                                                       /* Takes chocies into code */
        const number = choice.dataset['number'];                                        /* Takes entered data number from html */
        choice.innerText = currentQuestion['choice' + number];                          /* Takes number out of choice (Allows use of only number) */
    });

    
    
    availableQuesions.splice(questionIndex, 1);                                         /* Get rid of used question from the array */
    acceptingAnswers = true;                                                            /* Chnages to allow answers for next question */
    };




    choices.forEach((choice) => {                                                       /*  */
        choice.addEventListener('click', (e) => {                                       /* Stores which question clicked */
            if (!acceptingAnswers) return;                                              /* If loop */

            acceptingAnswers = false;                                                   /* Changes to stop answers being submitted */
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];
            
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";       /* Apply css class based on answer correctness */
            
            if (classToApply === "correct") {
                incrementScore(CORRECT_MARK);                                           /* Apply coorect mark constant to the score display */
            }

            selectedChoice.parentElement.classList.add(classToApply);                   /* Apply to entire box elemnt on display */

            setTimeout(() => {
              selectedChoice.parentElement.classList.remove(classToApply);              /* Remove class so it does not carry over to next question (confusing) */
            getNewQuestion();                                                           /* Restart */
        }, 1000);
        });
    });

    incrementScore = num => {                                                           /* Changes start game score variable */
      score += num;
      scoreText.innerText = score;
    };


startGame();