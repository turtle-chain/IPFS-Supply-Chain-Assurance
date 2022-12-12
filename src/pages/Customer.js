import React from "react";
import DownloadPhotoFromIPFS from "../components/organisms/DownloadPhotoFromIPFS";
import Typography from "../components/atoms/Typography";
import Card from "../components/molecules/Card";
import Banner from "../components/molecules/Banner";

const Customer = () => {
  const [biddoc, setBiddoc] = React.useState("");
  return (
    <div className="flex flex-col justify-center text-center">
      <Banner
        role="Supplier"
        text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
        text2="Join the future of blockchain today and discover the ease and security our platform offers!"
      />
      <Card className="w-1/2 self-center mb-4">
        <DownloadPhotoFromIPFS />
      </Card>
    </div>
  );
};

export default Customer;
