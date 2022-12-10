import React from "react";
import { ipfs } from "../utils/ipfs";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import { ethers } from "ethers";
import SCA from "../artifacts/contracts/SCA.sol/SCA.json";

const Supplier = () => {
  const [carrier, setCarrier] = React.useState([]);
  const [biddoc, setBiddoc] = React.useState("");
  const [cid, setCid] = React.useState();
  let [regok, setRegok] = React.useState("");
  const [images, setImages] = React.useState([]);
  const scaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    //add cid to smart contract
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(scaAddress, SCA.abi, signer);
      try {
        const transaction = await contract.addcid(result.path);
        await transaction.wait();
        setCid("File upload successfuly");
      } catch (err) {
        console.log("Error: ", err);
      }
    }

    form.reset();
  };

  //Carrier's registration
  async function registerCarrierCust() {
    console.log("register carreier", carrier);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(scaAddress, SCA.abi, signer);

      try {
        const transaction = await contract.register(carrier);
        await transaction.wait();
        setRegok("Regisration OK");
        console.log("Registration OK");
      } catch (err) {
        setRegok("Regisration failed");
        console.log("Error: ", err);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center text-center bg-custom-background">
      {ipfs && (
        <>
          <h3 className="text-3xl font-bold text-custom-back">
            IPFS Supply Chain Assurance
          </h3>
          <div className="flex items-start mb-6"> </div>

          <h1 className="text-xl font-semibold text-gray-900 text-center">
            1. Carrier registration
          </h1>

          <div className="grid mb-2 md:grid-cols-3">
            <div> </div>
            <div>
              <div>
                <label
                  for="last_name"
                  className="block mb-4 text-sm font-medium text-gray-900 "
                >
                  Add carrier
                </label>

                <Input
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5  "
                  onChange={(e) => setCarrier(e.target.value)}
                  label="Add Carrier"
                  required
                />

                <div className="flex items-start mb-6"></div>
                <p>{regok}</p>
              </div>

              <Button onClick={registerCarrierCust}>Register</Button>
              <br></br>
            </div>
          </div>

          <div className="flex items-start mb-6"></div>

          <h1 className="text-xl font-semibold text-gray-700 text-center">
            2. Upload the photo of the goods to be transported
          </h1>

          <div className="flex items-start mb-6"> </div>
          <form onSubmit={onSubmitHandler}>
            <div className="flex justify-center">
              <div className="mb-3 w-96">
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="file"
                />
              </div>
            </div>

            <Button className="bg-black" type="submit">
              Upload file
            </Button>
          </form>
        </>
      )}

      <div className="flex flex-wrap justify-center">
        {images.map((image, index) => (
          <img
            alt={`Uploaded #${index + 1}`}
            src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
            className="p-1 bg-white border rounded max-w-sm"
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
        ))}
      </div>

      {images.map((image, index) => (
        <h3>Path:{image.path}</h3>
      ))}

      <h3>{cid}</h3>

      <div className="grid grid-cols-3 gap-4" />
      <div className="flex items-start mb-6"></div>

      <br></br>

      <br></br>

      <div className="flex items-start mb-6"> </div>

      <div className="hashing-form">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          3. Download photo from IPFS
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

export default Supplier;
