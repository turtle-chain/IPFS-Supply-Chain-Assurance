import React from "react";
import TurtleChain from "../../../assets/turtle.jpg";
import Typography from "../../atoms/Typography";

const Banner = ({ role, text, text2 }) => {
  return (
    <div className="flex flex-col align-middle place-content-center bg-custom-primary">
      {/* <img src={TurtleChain} alt="tutle-chain-banner" className="w-1/5 h-1/5" /> */}
      <Typography
        text={text}
        tag="h3"
        className="w-4/5 self-center text-white p-2 pb-6"
      />
      <Typography
        text={text2}
        tag="h3"
        className="w-4/5 self-center text-white p-2 pb-6"
      />
      {/* <h3 className="text-3xl font-bold text-custom-back">{text}</h3> */}
    </div>
  );
};

export default Banner;
