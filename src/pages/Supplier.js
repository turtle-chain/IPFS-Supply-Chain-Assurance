import React from "react";
import { ipfs } from "../utils/ipfs";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Card from "../components/molecules/Card";
import { ethers } from "ethers";
import SCA from "../artifacts/contracts/SCA.sol/SCA.json";
import Banner from "../components/molecules/Banner";
import Typography from "../components/atoms/Typography";
import DownloadPhotoFromIPFS from "../components/organisms/DownloadPhotoFromIPFS";

const Supplier = () => {
  const [carrier, setCarrier] = React.useState([]);
  const [biddoc, setBiddoc] = React.useState("");
  const [cid, setCid] = React.useState();
  let [regok, setRegok] = React.useState("");
  const [images, setImages] = React.useState([]);

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
      const contract = new ethers.Contract(
        process.env.REACT_APP_scaAddress,
        SCA.abi,
        signer
      );
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
      const contract = new ethers.Contract(
        process.env.REACT_APP_scaAddress,
        SCA.abi,
        signer
      );

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

  if (!ipfs) return null;

  return (
    <div className="flex flex-col justify-center text-center">
      <Banner
        role="Supplier"
        text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
        text2="Join the future of blockchain today and discover the ease and security our platform offers!"
      />
      <Card className="w-1/2 self-center">
        <Typography
          text="Register the carrier by inserting his wallet adddress"
          tag="h2"
          className="text-left"
        />
        <Typography
          text="The carrier address will be registered in the smart contract to allow him sign new photos."
          tag="h4"
          className="text-left"
        />
        <div className="self-center w-full text-center mt-4">
          <Input
            onChange={(e) => setCarrier(e.target.value)}
            label="Add Carrier's wallet address"
            required
          />
          <p>{regok}</p>
        </div>

        <Button onClick={registerCarrierCust} className="w-32 self-center">
          Register
        </Button>
      </Card>

      <Card className="w-1/2 self-center">
        <Typography
          text="Upload the photo of the goods to be transported"
          tag="h2"
          className="text-left"
        />

        <Typography
          text="This photo will be uploaded through IPFS to the smart contract for carrier's revision"
          tag="h4"
          className="text-left"
        />
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col self-center w-full mt-4"
        >
          <Input type="file" id="file" />
          <Button type="submit" className=" w-32 self-center">
            Upload file
          </Button>
        </form>

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
          <h3>CID:{image.path}</h3>
        ))}

        <h3>{cid}</h3>
      </Card>

      <Card className="w-1/2 self-center mb-12">
        <DownloadPhotoFromIPFS />
      </Card>
    </div>
  );
};

export default Supplier;
