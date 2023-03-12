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
          text="1-  Testnet network configuration: Open your  Metamask wallet and add a Mumbai network, following the instruction in: https://docs.unstoppabledomains.com/manage-domains/guides/add-polygon-to-metamask/ "
          className="text-left"
        />
      
      <Typography
          tag="h3"
          text="."
          className="text-left"
        />

        <Typography
          tag="h3"
          text="2- Supplier Role: Add a new account with the following private testing key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
          className="text-left"
        />
        <Typography
          tag="h3"
          text="3- Add credit to the previously created account, entering the website: https://faucet.polygon.technology/"
          className="text-left mt-4"
        />
        <Typography
          tag="h3"
          text="4- Carrier Role: Configure Metamask with the following private testing key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d.
                 If it is neccesary, add credit by faucet Mumbai website"
          className="text-left mt-4"
        />

        <Typography
          tag="h3"
          text="5-  Once configured both keys, connect metamask with the corresponding's metamask account and refresh the application."
          className="text-left mt-4"
        />
        <Typography
          tag="h3"
          text="6-Test the supplier role by inserting a carrier (second metamask account) and uploading a photo to IPFS."
          className="text-left mt-4"
        />

        <Typography
          tag="h3"
          text="7- Test the carrier role by signing the CID provided by the supplier.Switch between roles by changing the connected metamask account."
          className="text-left mt-4"
        />

<Typography
          tag="h3"
          text="8- Customer role: is only enabled to see the photos provided by the supplier/carrier by the ID.This role is assigned to the user who
                   log in with no metamask, or with metamask account not registered as carrier"
          className="text-left mt-4"
        />

               <DownloadPhotoFromIPFS />
        
      </Card>
    </MainLayout>
  );
};

export default Customer;
