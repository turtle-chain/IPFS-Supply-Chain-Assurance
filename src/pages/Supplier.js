import React from "react";
import { ipfs } from "../utils/ipfs";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Card from "../components/molecules/Card";
import { ethers } from "ethers";
import SCA from "../artifacts/contracts/SCA.sol/SCA.json";
import Banner from "../components/molecules/Banner";
import Typography from "../components/atoms/Typography";

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
      <div className="bg-custom-primary p-2  ">
        <Typography
          text="IPFS Supply Chain Assurance"
          tag="h1"
          className="text-white text-center"
        />
      </div>
      <Banner
        role="Supplier"
        text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
        text2="Join the future of blockchain today and discover the ease and security our platform offers!"
      />

      <Card className="w-1/2 self-center">
        <Typography
          text="1. Register the carrier by inserting his wallet adddress"
          tag="h2"
          className="py-4"
        />
        <div className="self-center w-full text-center">
          <Input
            onChange={(e) => setCarrier(e.target.value)}
            label="Add Carrier's wallet address"
            required
            className="self-center"
          />
          <p>{regok}</p>
        </div>

        <Button onClick={registerCarrierCust} className="w-32 self-center">
          Register
        </Button>
      </Card>

      <Card className="w-1/2 self-center">
        <Typography
          text="2. Upload the photo of the goods to be transported"
          tag="h2"
          className="py-4"
        />

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col self-center w-full"
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
        <Typography
          text="3. Download photo from IPFS by inserting the CID"
          tag="h2"
          className="py-4"
        />

        <Input
          onChange={(e) => setBiddoc(e.target.value)}
          placeholder="Insert CID"
          required
          className="w-4/5 self-center"
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
      </Card>
    </div>
  );
};

export default Supplier;
