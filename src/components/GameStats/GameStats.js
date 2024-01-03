import React from "react";

function GameStats({ numCorrectGames, numTotalGames, numTotalGuesses }) {
  const avgNumGuessesInCorrectGame =
    numCorrectGames > 0 ? numTotalGuesses / numCorrectGames : 0;
  return (
    <p>
      <p>
        <strong>Game history</strong>
      </p>
      You have won {(Number(numCorrectGames / numTotalGames) * 100).toFixed(0)}%
      of {numTotalGames > 1 ? `${numTotalGames} games` : "1 game"}
      {numCorrectGames > 0 &&
        ` with an average correct answer in 
    ${Number(avgNumGuessesInCorrectGame.toFixed(2))} guess${
          avgNumGuessesInCorrectGame > 1 ? "es" : ""
        }`}
    </p>
  );
}

export default GameStats;
