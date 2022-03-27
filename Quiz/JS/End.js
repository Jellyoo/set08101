const username = document.getElementById('username');                           /* Constant for username */
const saveScoreBtn = document.getElementById('saveScoreBtn');                   /* Wheter or not username is input and button can be pressed */
const finalScore = document.getElementById('finalScore');                       /*  */
const mostRecentScore = localStorage.getItem('mostRecentScore');                /*  */

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];        /*  */

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {                                      /* Decides wheter save should be enabled or disabled depending on input username */
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();                                                         /* Stop deafult form subission (sendign to new page) */

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};


