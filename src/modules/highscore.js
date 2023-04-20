// Initialize variable to store ordered list element
let ol;
// Retrieve and display all highscores from the database
export async function getAllHighscores() {

  const firebaseUrl = "https://highscore-e9287-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";
  // Fetch data from the Firebase database
  const response = await fetch(firebaseUrl);
  const data = await response.json();
  console.log(data);

  // Sort the highscores by score in descending order
  const sortedData = Object.values(data).sort((a, b) => b.score - a.score);

  // Update the highscore list in the HTML document
  const scoreListDiv = document.getElementById("score-list");

  // Create ordered list element if it doesn't exist
  if (!ol) {
    ol = document.createElement("ol");
    ol.id = "ol-list"
    scoreListDiv.append(ol);
  } else {
    // If ordered list already exists, clear its content
    ol.innerHTML = '';
  }
  // Loop through sortedData and append highscore information to ordered list element
  sortedData.forEach((score, index) => {
    const highscoreContainer = document.createElement("div");
    const highscoreRank = document.createElement("p");
    const highscoreUser = document.createElement("p");
    const highscoreScore = document.createElement("h3");

    highscoreRank.textContent = `#${index + 1}`;
    highscoreUser.textContent = `Name: ${score.name}`;
    highscoreScore.textContent = `Score: ${score.score}`;

    highscoreContainer.appendChild(highscoreRank);
    highscoreContainer.appendChild(highscoreUser);
    highscoreContainer.appendChild(highscoreScore);

    ol.appendChild(highscoreContainer); // add highscoreContainer to ol
  });
}
// Add a new highscore to the database and update the list
export async function addHighscoreToFirebase(userPoints, showPlayerName) {
  const firebaseUrl = "https://highscore-e9287-default-rtdb.europe-west1.firebasedatabase.app/highscore.json";

  // Construct the new highscore object with the player's name and score
  const newHighscore = {
    name: showPlayerName,
    score: userPoints
  };
  // Add the new highscore to the Firebase database
  const response = await fetch(firebaseUrl, {
    method: "POST",
    body: JSON.stringify(newHighscore),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  // Retrieve the unique key of the newly added highscore from the response
  const data = await response.json();
  const key = Object.keys(data)[0];

  // Retrieve and sort all highscores from the database
  const response2 = await fetch(firebaseUrl);
  const data2 = await response2.json();
  const sortedData = Object.values(data2).sort((a, b) => b.score - a.score);

  // Update the highscores in the Firebase database with only the top 5
  const updatedData = [];
  for (let i = 0; i < 5; i++) {
    if (sortedData[i]) {
      updatedData.push(sortedData[i]);
    } else {
      updatedData.push({ name: "", score: 0 });
    }
  }
  // Update Firebase database with the top 5 highscores
  await fetch(firebaseUrl, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  // Retrieve the highscores from the Firebase database and display them
  await getAllHighscores();
  return key;
}

