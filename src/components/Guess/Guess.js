import React from "react";
import { range } from "../../utils";

function Guess({ guess }) {
  // we are guaranteed that guess will always be an string of length 5, OR undefined
  return (
    <p className="guess">
      {range(5).map((i) => (
        <span
          className={`cell${guess ? ` ${guess[i].status}` : ""}`}
          key={i} // this is fine as a key because these will never move
        >
          {guess ? guess[i]?.letter : ""}
        </span>
      ))}
    </p>
  );
}

export default Guess;
