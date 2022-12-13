import React from "react";

import Typography from "../../atoms/Typography";
import Input from "../../atoms/Input";

const DownloadPhotoFromIPFS = () => {
  const [biddoc, setBiddoc] = React.useState("");
  return (
    <>
      <Typography text="Download the photo" tag="h2" className="text-left" />

      <Typography
        text="This step is for validating or viewing again the photo."
        tag="h4"
        className="text-left"
      />
      <Input
        onChange={(e) => setBiddoc(e.target.value)}
        placeholder="Insert CID"
        required
        className="w-4/5 self-center mt-2"
      />
      {biddoc && (
        <div className="flex flex-wrap justify-center">
          <img
            alt="Bidding document"
            src={"https://skywalker.infura-ipfs.io/ipfs/" + biddoc}
            style={{ maxWidth: "400px", margin: "15px" }}
            onError={(e) => {
              e.target.src =
                "https://skywalker.infura-ipfs.io/ipfs/QmYEGHkGxNut1zGGFiW6ERNgCcV5cwmXcpZgtT2NXUtGDP"; //replacement image imported above
              e.target.style = "padding: 8px; margin: 16px"; // inline styles in html format
            }}
          />
        </div>
      )}
    </>
  );
};

export default DownloadPhotoFromIPFS;
