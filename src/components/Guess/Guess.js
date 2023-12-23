import React from "react";
import { range } from "../../utils";

function Guess({ guess }) {
  // we are guaranteed that guess will always be an array of length 5
  return (
    <p className="guess">
      {range(5).map((i) => (
        <span className="cell" key={i}>
          {guess[i] ?? ""}
        </span>
      ))}
    </p>
  );
}

export default Guess;
