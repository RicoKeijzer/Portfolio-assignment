// Add a click event listener to each grid item

/* Example json structure
  "game":1,
  "description":"day4",
  "results":[{
    "description":"colors",
    "group":1,
    "items":[
        "blue", 
        "red", 
        "yellow", 
        "black"
      ]
    },
    {
      "description":"number",
      etc..
*/

// game content
const game1Json =
  '{"game":1,"description":"day4","results":[{"description":"colors","group":1,"items":["Blue", "Red", "Yellow", "Black"]},{"description":"number", "group":2,"items":["One", "Two", "Three", "Eight"]},{"description":"names","group":3,"items":["john", "Jack", "Jason", "Jacob"]},{"description":"Animals", "group":4,"items":["Cow", "Horse", "Dog", "Cat"]}]}';

//startConnectionsgame(...game1Json);
//startConnectionsgame(
//  '{"game":1,"description":"day4","results":[{"description":"colors","group":1,"items":["Blue", "Red", "Yellow", "Black"]},{"description":"number", "group":2,"items":["One", "Two", "Three", "Eight"]},{"description":"names","group":3,"items":["john", "Jack", "Jason", "Jacob"]},{"description":"Animals", "group":4,"items":["Cow", "Horse", "Dog", "Cat"]}]}'
//);

console.log("Lets play connections");

export function startConnectionsgame(gameJson) {
  // initialize functions
  // higher order function for ...

  //
  const gameObj = JSON.parse(gameJson);

  const container = document.getElementById(`connection-game${gameObj.game}`);
  const resultsObj = gameObj.results;
  //const gameNumber = gameObj.game;
  const games = [];
  const gamesStatus = [false, false, false, false];
  let words = [];
  let selectedwords = document.querySelectorAll(".selected");
  //  console.log(gameNumber);

  //get games
  for (let ii = 0; ii < resultsObj.length; ii++) {
    const game = resultsObj[ii];
    games.push(game);

    const wordsInGame = game.items;
    words.push(...wordsInGame);
  }

  // shuffle words
  words = words.sort(() => {
    const randomTrueOrFalse = Math.random() > 0.5;
    return randomTrueOrFalse ? 1 : -1;
  });
  console.log("shuffeled words are: ");
  console.log(words);

  // add words to container
  [...words].forEach((word) => {
    addWordToContainer(word);
  });

  // addWordsToContainer
  function addWordToContainer(word) {
    const node = document.createElement("div");
    node.classList.add("grid-item");
    node.innerText = word;

    node.addEventListener("click", () => {
      // When a grid item is clicked, you can perform some action on it.
      // For example, you can change its background color.

      if (node.classList.contains("selected")) {
        node.classList.remove("selected");
      } else {
        if (document.querySelectorAll(".selected").length < 4) {
          node.classList.add("selected");
        }
      }

      //update the selectedwords
      selectedwords = document.querySelectorAll(".selected");
      console.log(`Selected: ${selectedwords.length}`);
    });

    // append
    container.appendChild(node);
  }
  //    .getElementById(`submit-btn-game${gameObj.game}`)
  //submit button
  document
    .getElementById(`submit-btn-game${gameObj.game}`)
    .addEventListener("click", () => {
      //selectedItems = document.querySelectorAll(".selected");
      if (selectedwords.length == 4) {
        checkWords();
      } else {
        console.log("not enough items selected");
      }
    });

  function checkWords() {
    const wordsforcheck = [];
    selectedwords.forEach((item) => {
      wordsforcheck.push(item.innerText);
    });
    console.log(wordsforcheck);

    //
    //get games
    for (let ii = 0; ii < games.length; ii++) {
      let wordsInGame = games[ii].items;

      let resultCheck =
        wordsInGame.filter((x) => {
          return wordsforcheck.includes(x);
        }).length == 4;

      console.log(resultCheck);

      if (resultCheck) {
        gamesStatus[ii] = true;

        words = words.filter((x) => {
          return !wordsforcheck.includes(x);
        });

        //remove current issue before placing the new one.
        const removals = document.querySelectorAll(".grid-item");
        removals.forEach((x) => {
          container.removeChild(x);
        });

        //
        const node = document.createElement("div");
        const jj = gamesStatus.filter((x) => x == true).length;
        node.classList.add(`grid-item-win-row-${jj}`);
        node.innerText = games[ii].description;
        container.appendChild(node);

        // add words to container
        [...words].forEach((word) => {
          addWordToContainer(word);
        });
      }
    }
  }
}
