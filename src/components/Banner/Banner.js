import React from "react";

function Banner({ status, children }) {
  return (
    <div children className={`${status} banner`}>
      {...children}
    </div>
  );
}

export default Banner;
