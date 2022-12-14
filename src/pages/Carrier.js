import React from "react";
import Button from "../components/atoms/Button";
import Banner from "../components/molecules/Banner";
import Input from "../components/atoms/Input";
import Typography from "../components/atoms/Typography";
import Card from "../components/molecules/Card";
import { ethers } from "ethers";
import SCA from "../artifacts/contracts/SCA.sol/SCA.json";
import DownloadPhotoFromIPFS from "../components/organisms/DownloadPhotoFromIPFS";

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
    // if (sig) {
    //   setSignatures(sig);
    // }

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
    <div className="flex justify-center text-center h-full">
      <div className="w-1/3">
        <Banner
          role="Carrier"
          text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
          text2="Join the future of blockchain today and discover the ease and security our platform offers!"
          className="min-h-screen h-full justify-start pt-32"
        />
      </div>
      <div className="w-2/3 px-6">
        {images.map((image, index) => (
          <h3>Path:{image.path}</h3>
        ))}

        <h3>{cid}</h3>
        <Card className=" self-center">
          <Typography text="Sign the photo" tag="h2" className="text-left" />
          <Typography
            text="By signing the photo you are accepting that you have received the good with status OK."
            tag="h4"
            className="text-left"
          />

          <form
            onSubmit={handleSign}
            className="flex flex-col self-center w-full "
          >
            <Input
              onChange={(e) => setBiddoc(e.target.value)}
              placeholder="Insert CID"
              name="message"
              required
              className="w-4/5 self-center mt-2"
            />
            <Button type="submit" className="self-center">
              Sign photo
            </Button>
            {error}
          </form>
        </Card>
        <Card className="self-center mb-4">
          <DownloadPhotoFromIPFS />
        </Card>

        <Card className=" self-center mb-5">
          <Typography
            text="Verification of the sign"
            tag="h2"
            className="text-left"
          />

          <Typography
            text="This step is for showing the customer the photo was properly signed"
            tag="h4"
            className="text-left"
          />
          <form className="flex flex-col" onSubmit={handleVerification}>
            <Input
              onChange={(e) => setBiddoc(e.target.value)}
              placeholder="Insert CID"
              name="message"
              required
              className="w-4/5 self-center mt-2"
            />
            <Button type="submit" className="self-center">
              Show Verification
            </Button>
            {error}

            <p>{validcid}</p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Carrier;
