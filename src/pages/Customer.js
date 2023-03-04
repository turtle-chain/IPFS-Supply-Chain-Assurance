import React from "react";
import DownloadPhotoFromIPFS from "../components/organisms/DownloadPhotoFromIPFS";
import Card from "../components/molecules/Card";
import MainLayout from "../components/organisms/MainLayout";
import Typography from "../components/atoms/Typography";

const Customer = () => {
  return (
    <MainLayout>
      <Card className="md:w-2/3 w-full self-center mb-4 mx-6">
        {/* <DownloadPhotoFromIPFS /> */}
        <Typography
          tag="h2"
          text="Steps for testing the application"
          className="mb-8"
        />
        <Typography
          tag="h3"
          text="1- Connect to the corresponding Metamask Keys:"
          className="text-left"
        />

        <Typography
          tag="h3"
          text="-  Supplier Role: Configure Metamask with the following private testing key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
          className="text-left"
        />
        <Typography
          tag="h3"
          text="- Carrier Role: Configure Metamask with the following private testing key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
          className="text-left"
        />
        <Typography
          tag="h3"
          text="2- Once configured both keys, connect metamask with the corresponding's metamask account and  refresh the application."
          className="text-left mt-4"
        />
        <Typography
          tag="h3"
          text="3- Test the supplier role by inserting a carrier (second metamask account) and uploading a photo to IPFS."
          className="text-left mt-4"
        />
        <Typography
          tag="h3"
          text="4- Test the carrier role by signing the CID provided by the supplier."
          className="text-left mt-4"
        />

        <Typography
          tag="h3"
          text="Switch between roles by changing the connected metamask account."
          className="text-left mt-4"
        />
      </Card>
    </MainLayout>
  );
};

export default Customer;
