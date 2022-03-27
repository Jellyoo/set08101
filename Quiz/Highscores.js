/* Elliot Mackenzie Bruce, (ID) , Web Technologies Coursework */

const highScoresList = document.getElementById("highScoresList");                       /* Constant to store the list */
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];                /* Json file of highscores under highscores constant */




/* Moving stored scores into a list to be displayed using map, creates an html string */
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");