import React from "react";
import DownloadPhotoFromIPFS from "../components/organisms/DownloadPhotoFromIPFS";
import Typography from "../components/atoms/Typography";
import Card from "../components/molecules/Card";
import Banner from "../components/molecules/Banner";

const Customer = () => {
  const [biddoc, setBiddoc] = React.useState("");
  return (
    <div className="flex justify-center text-center h-full">
      <div className="w-1/3">
        <Banner
          role="Customer"
          text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
          text2="Join the future of blockchain today and discover the ease and security our platform offers!"
          className="min-h-screen h-full justify-start pt-32"
        />
      </div>
      <Card className="w-2/3 self-center mb-4 mx-6">
        <DownloadPhotoFromIPFS />
      </Card>
    </div>
  );
};

export default Customer;
