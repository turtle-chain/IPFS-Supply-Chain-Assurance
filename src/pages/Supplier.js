import React from "react";
import { ipfs } from "../utils/ipfs";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Card from "../components/molecules/Card";
import { ethers } from "ethers";
import SCA from "../artifacts/contracts/SCA.sol/SCA.json";
import Banner from "../components/molecules/Banner";
import Typography from "../components/atoms/Typography";
import QRCode from "react-qr-code";
import HistoricalInfo from "../components/organisms/HistoricalInfo";

const Supplier = () => {
  const [carrier, setCarrier] = React.useState([]);
  const [cid, setCid] = React.useState();
  let [regok, setRegok] = React.useState("");
  const [images, setImages] = React.useState([]);

  const contract = React.useMemo(() => {
    let contract;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(
        process.env.REACT_APP_scaAddress,
        SCA.abi,
        signer
      );
    }
    return contract;
  }, []);

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
    if (typeof window.ethereum !== "undefined") {
      try {
        const transaction = await contract.register(carrier);
        await transaction.wait();
        setRegok("Registration OK");
      } catch (err) {
        setRegok("Registration failed");
        console.log("Error: ", err);
      }
    }
  }

  if (!ipfs) return null;

  return (
    <div className="flex md:flex-row flex-col justify-center text-center h-full">
      <div className="md:w-1/3 w-full bg-custom-primary md:min-h-screen">
        <Banner
          role="Supplier"
          text="Our platform offers suppliers the unique opportunity to register their carriers on a blockchain to ensure that all their transactions are carried out securely. Protect your assets and make sure you maintain a high level of security."
          text2="Join the future of blockchain today and discover the ease and security our platform offers!"
          className=" h-full justify-start"
        />
      </div>
      <div className="md:w-2/3 w-full px-6">
        <Card className="self-center">
          <Typography
            text="Register the carrier"
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
              placeholder="0xf39Fd6e51a...."
              required
            />
            <p>{regok}</p>
          </div>

          <Button onClick={registerCarrierCust} className="w-32 self-center">
            Register
          </Button>
        </Card>

        <Card className="self-center">
          <Typography
            text="Upload the photo of the goods"
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
          {cid ? (
            <>
              {images.map((image, index) => (
                <div className="flex flex-col justify-center">
                  <h3>CID:{image.path}</h3>
                  <QRCode
                    value={image.path}
                    className="self-center py-2 h-40"
                  />
                </div>
              ))}

              <h3>{cid}</h3>
            </>
          ) : null}
        </Card>

        {/* <Card className="self-center mb-4">
          <DownloadPhotoFromIPFS />
        </Card> */}

        <Card className="self-center mb-4">
          <HistoricalInfo contract={contract} />
        </Card>
      </div>
    </div>
  );
};

export default Supplier;
