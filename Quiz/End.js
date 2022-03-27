const username = document.getElementById('username');                           /* Constant for username */
const saveScoreBtn = document.getElementById('saveScoreBtn');                   /* Wheter or not username is input and button can be pressed */
const finalScore = document.getElementById('finalScore');                       /* Assign to local varible in local storage to pull from for h1 title */
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];        /* Save to localo JSON file */

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;                                         /* Store most recent score */

username.addEventListener('keyup', () => {                                      /* Decides wheter save should be enabled or disabled depending on input username */
    saveScoreBtn.disabled = !username.value;
});

    saveHighScore = (e) => {
         e.preventDefault();                                                         /* Stop deafult form subission (sendign to new page) */

    const score = {
        score: mostRecentScore,                                                 /* Score save d from most recent */
        name: username.value,                                                   /* Username saved from username input */
        };
            highScores.push(score);                                             /*  */
            highScores.sort((a, b) => b.score - a.score);                       /* Sort Algorighm for array, if b is hgiher than a put a higher than b */
            highScores.splice(5);                                               /* Only save highest 5 scores */

            localStorage.setItem('highScores', JSON.stringify(highScores));
            window.location.assign('../index.html');
        };


