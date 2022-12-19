import React from "react";
import TurtleChain from "../../../assets/turtle.jpg";
import Typography from "../../atoms/Typography";
import { classNames } from "../../../utils/helpers";

const Banner = ({ role, text, text2, className }) => {
  return (
    <div
      className={classNames(
        "flex flex-col md:align-middle md:place-content-center bg-custom-primary",
        className
      )}
    >
      {/* <img src={TurtleChain} alt="tutle-chain-banner" className="w-1/5 h-1/5" /> */}
      <Typography
        text={`👋 Hello ${role}`}
        tag="h1"
        className="text-white text-center md:pt-2"
      />
      <Typography
        text="IPFS Supply Chain Assurance"
        tag="h2"
        className="text-white text-center pt-2 mb-8"
      />
      <Typography
        text={text}
        tag="h3"
        className="md:w-4/5 w-full self-center text-white p-2 hidden md:block"
      />
      <Typography
        text={text2}
        tag="h3"
        className="md:w-4/5 w-full self-center text-white p-6 hidden md:block"
      />
    </div>
  );
};

export default Banner;
