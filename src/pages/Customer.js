import React from "react";
import { ipfs } from "../utils/ipfs";

const Customer = () => {
  const [biddoc, setBiddoc] = React.useState("");
  return (
    <div className="flex flex-col justify-center text-center bg-custom-background">
      {ipfs && (
        <>
          <h3 className="text-3xl font-bold text-custom-back">
            IPFS Supply Chain Assurance Customer
          </h3>
          <div className="flex items-start mb-6"> </div>

          <div className="flex items-start mb-6"></div>
        </>
      )}

      <div className="grid grid-cols-3 gap-4" />
      <div className="flex items-start mb-6"></div>

      <br></br>

      <br></br>

      <div className="flex items-start mb-6"> </div>

      <div className="hashing-form">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Download photo from IPFS
        </h1>

        <div>
          <div className="flex items-start mb-6"></div>
        </div>
        <div className="grid mb-2 md:grid-cols-3">
          <div> </div>
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Download photo
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5"
              onChange={(e) => setBiddoc(e.target.value)}
              placeholder="Input CID"
              required
            />
          </div>
          <div> </div>
          <div> </div>
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
        </div>
      </div>
    </div>
  );
};

export default Customer;
