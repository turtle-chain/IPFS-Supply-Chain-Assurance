import React from "react";
import DownloadPhotoFromIPFS from "../components/organisms/DownloadPhotoFromIPFS";
import Card from "../components/molecules/Card";
import MainLayout from "../components/organisms/MainLayout";

const Customer = () => {
  return (
    <MainLayout>
      <Card className="md:w-2/3 w-full self-center mb-4 mx-6">
        <DownloadPhotoFromIPFS />
      </Card>
    </MainLayout>
  );
};

export default Customer;
