import React from "react";
import { classNames } from "../../../utils/helpers";
import Banner from "../../molecules/Banner";

const MainLayout = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "flex justify-center text-center h-full",
        className
      )}
    >
      <div className="w-1/3">
        <Banner
          role=""
          text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
          text2="Join the future of blockchain today and discover the ease and security our platform offers!"
          className="min-h-screen h-full justify-start pt-32"
        />
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
