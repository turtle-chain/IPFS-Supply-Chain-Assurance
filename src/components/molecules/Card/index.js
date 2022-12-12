import React from "react";
import { classNames } from "../../../utils/helpers";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={classNames(
        "flex justify-center flex-col my-4 rounded-lg border-2 border-custom-primary bg-gray-100 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
