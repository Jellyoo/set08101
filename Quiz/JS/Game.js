const question = document.getElementById('question');                                               /* Stores all questions under an element */
const choices = Array.from(document.getElementsByClassName('choice-text'));                         /* Stores all question answer chocies in an array */
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");




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
        question:
            "Lewis Hamilton has won How many championships?",
        choice1: "7",
        choice2: "5",
        /*choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",*/
        answer: 1,
    },
    {
        question: "Which are official Formula 1 tire compounds?",
        choice1: "Medium",
        choice2: "Super Soft;",
        choice3: "Soft",
        choice4: "Super Medium",
        answer: 1,
    },
];





/* ----- CONSTANTS ----- */
/*const CORRECT_BONUS = 10;   */
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;                                                /* How many questions does a user get  */





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
        //go to the end page
        return window.location.assign('/end.html');
    }
    
    
    
    questionCounter++;                                                                  /* Incriment question count from startGame */
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
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
            
            const classToApply =
              selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";       /* Apply css class based on answer correctness */
            
                if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

            selectedChoice.parentElement.classList.add(classToApply);                   /* Appl;y to entire box elemnt on display */

            setTimeout(() => {
              selectedChoice.parentElement.classList.remove(classToApply);              /* Remove class so it does not carry over to next question (confusing) */
            getNewQuestion();                                                           /* Restart */
        }, 1000);
        });
    });

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame();