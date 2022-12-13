import React from "react";
import { classNames } from "../../../utils/helpers";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={classNames(
        "flex justify-center flex-col my-3 rounded-lg  bg-gray-100 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
