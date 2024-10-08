/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        
   
        // create a new div element, which will become the game card
         const gameCard = document.createElement('div');
         const donateBtn = document.createElement('div');
    

        // add the class game-card to the list

        gameCard.classList.add('game-card');
       
        gameCard.innerHTML = `
        <img src= ${game.img} alt="${game.name}" />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        <button id="donate-btn">Donate!</button>
        `;
        
    

        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        
            gamesContainer.appendChild(gameCard);
            gamesContainer.appendChild(donateBtn);
           
    }
}


// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
        
        <p>$${totalContributions.toLocaleString('en-US')}</p>
        `;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, raised) => {
    return acc + raised.pledged;
  }, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
        
        <p>$${totalRaised.toLocaleString('en-US')}</p>
        `;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (acc, numGames) => {
    return acc + 1;
  }, 0);

  gamesCard.innerHTML = `
        <p>${totalGames.toLocaleString('en-US')}</p>
        `;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let underGoal = GAMES_JSON.filter ( (games) => {
        return games.pledged < games.goal;
        
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(underGoal);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let overGoal = GAMES_JSON.filter ( (games) => {
        return games.pledged > games.goal;
    });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(overGoal);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const totalUnfunded = GAMES_JSON.filter((game) => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
let displayString = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games.
Currently, ${totalUnfunded} ${totalUnfunded > 1 ? "games" : "game"} remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const paragraphText = document.createElement('div');
paragraphText.classList.add('paragraph-text');

paragraphText.innerHTML = `
<p>${displayString}</p>
`;

descriptionContainer.appendChild(paragraphText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame, ...otherGames] = sortedGames;

const { name: firstName, desc: firstDesc, pledged: firstPledged, goal: firstGoal, backers: firstBackers, img: firstImg } = firstGame;
const { name: secondName, desc: secondDesc, pledged: secondPledged, goal: secondGoal, backers: secondBackers, img: secondImg } = secondGame;


// create a new element to hold the name of the top pledge game, then append it to the correct element

const dispFirstGame = document.createElement('div');
dispFirstGame.classList.add('first-text');
dispFirstGame.innerHTML = `
<p>${firstName}</p>
`;

const dispSecGame = document.createElement('div');
dispSecGame.classList.add('second-text');
dispSecGame.innerHTML = `
<p>${secondName}</p>
`;

firstGameContainer.appendChild(dispFirstGame);
secondGameContainer.appendChild(dispSecGame);
// do the same for the runner up item

//extra stuff




function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to add 'visible' class when the element is in the viewport
  function checkVisibility() {
    const elements = document.querySelectorAll('.game-card');
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }
  
  // Add event listener for scroll event
  window.addEventListener('scroll', checkVisibility);
  
  // Check visibility on load
  document.addEventListener('DOMContentLoaded', checkVisibility);