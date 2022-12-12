import React from "react";
import Button from "../components/atoms/Button";
import { ipfs } from "../utils/ipfs";
import { ethers } from "ethers";
import SCA from "../artifacts/contracts/SCA.sol/SCA.json";

const Carrier = () => {
  const [images, setImages] = React.useState([]);
  const [cid, setCid] = React.useState();
  const [error, setError] = React.useState();
  let [signedmesage, setSignedmesage] = React.useState("");
  const [biddoc, setBiddoc] = React.useState("");
  const [signatures, setSignatures] = React.useState();
  let [validcid, setValidcid] = React.useState("");

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function addValues(sig) {
    console.log("entra a addvalues");
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_scaAddress,
        SCA.abi,
        signer
      );
      console.log(sig.signature, sig.message, sig.address);
      const transaction = await contract.supply(sig.signature, sig.message);
      await transaction.wait();
    }
  }

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message"),
    });
    if (sig) {
      console.log("sig", sig);
      addValues(sig);
    }
  };
  //Carrier sign message
  const signMessage = async ({ setError, message }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      setSignedmesage(signature);
      console.log("SIGNATURE:", signedmesage);
      const address = await signer.getAddress();
      console.log("ADDRESS:", address);
      signedmesage = signature;

      return {
        message,
        signature,
        address,
      };
    } catch (err) {
      setError(err.message);
    }
  };
  const handleVerification = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log(data);
    console.log(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message"),
    });
    console.log("INPUT", data.get("message"));
    if (sig) {
      setSignatures(sig);
    }

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_scaAddress,
        SCA.abi,
        provider
      );
      try {
        const data = await contract.show(sig.message, sig.signature);
        console.log("data: ", data);
        if (data == true) {
          setValidcid("CID OK");
        } else {
          setValidcid("CID Incorrect");
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center text-center bg-custom-background">
      {ipfs && (
        <>
          <h3 className="text-3xl font-bold text-custom-back">
            IPFS Supply Chain Assurance Carrier
          </h3>
          <div className="flex items-start mb-6"> </div>

          <div className="grid mb-2 md:grid-cols-3">
            <div> </div>
          </div>

          <div className="flex items-start mb-6"></div>
        </>
      )}

      {images.map((image, index) => (
        <h3>Path:{image.path}</h3>
      ))}

      <h3>{cid}</h3>

      <h1 className="text-xl font-semibold text-gray-700 text-center">
        1. The carrier signs the photo
      </h1>

      <form className="m-4" onSubmit={handleSign}>
        <textarea
          required
          type="text"
          name="message"
          className="textarea w-4/6 h-24 textarea-bordered focus:ring focus:outline-none"
          placeholder="Message"
        />

        <div className="flex items-start mb-6"> </div>

        <Button type="submit">Sign message</Button>
        {error}
      </form>

      <div className="grid grid-cols-3 gap-4" />
      <div className="flex items-start mb-6"></div>

      <br></br>

      <br></br>

      <div className="flex items-start mb-6"> </div>

      <div className="hashing-form">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          2. Download photo from IPFS
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

        <h1 className="text-xl font-semibold text-gray-700 text-center">
          3.Verification of the CID's authenticity
        </h1>
        <form className="m-4" onSubmit={handleVerification}>
          <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
            <main className="mt-4 p-4">
              <div className="">
                <div className="my-3">
                  <textarea
                    required
                    type="text"
                    name="message"
                    className="textarea w-4/6 h-24 textarea-bordered focus:ring focus:outline-none"
                    placeholder="Message"
                  />
                </div>
              </div>
            </main>
            <footer className="p-4">
              <Button type="submit">Verify</Button>
              {error}
            </footer>

            <p>{validcid}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Carrier;
