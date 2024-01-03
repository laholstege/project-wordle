import React from "react";

function Key({ letter, status }) {
  return <button className={`key${status}`}>{letter}</button>;
}

function Keyboard({ guesses }) {
  const guessedLetters = guesses.flat();
  const statusPriority = {
    correct: 3,
    misplaced: 2,
    incorrect: 1,
  };

  const letterStatus = guessedLetters.reduce((acc, { letter, status }) => {
    if (!acc[letter] || statusPriority[status] > statusPriority[acc[letter]]) {
      acc[letter] = status;
    }
    return acc;
  }, {});

  console.log(letterStatus);
  const result = Object.entries(letterStatus).map(([letter, status]) => ({
    letter,
    status,
  }));
  console.log("result", result);
  return (
    <div className="keyboard">
      {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, i) => {
        return (
          <div key={i} className="keyboard-row">
            {row.split("").map((letter, j) => {
              // for every letter in the alphabet, see if it's in our results
              const index = result.findIndex((r) => r.letter === letter);
              const s = index > -1 ? ` ${result[index].status}` : "";
              return <Key key={j} letter={letter} status={s} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Keyboard;
