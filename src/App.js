import "./index.css";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import Supplier from "./pages/Supplier";
import Carrier from "./pages/Carrier";
import Customer from "./pages/Customer";
import SCA from "./artifacts/contracts/SCA.sol/SCA.json";

// Update with the contract address after deploying the smart contract
// const scaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// insert your infura project credientals

function App() {
  const [signatures, setSignatures] = useState();
  const [error, setError] = useState();
  let [signedmesage, setSignedmesage] = useState("");
  let [validcid, setValidcid] = useState("");
  let [role, setRole] = useState("");
  const scaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(() => {
    async function fetchData() {
      try {
        if (!window.ethereum)
          throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(scaAddress, SCA.abi, signer);
        const contractRole = await contract.getRole(address);

        if (contractRole === "0") {
          setRole("Supplier");
        } else if (contractRole === "1") {
          setRole("Carrier");
        } else {
          setRole("Customer");
        }
      } catch (error) {
        console.log("error");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("role", role);
  }, [role]);

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

  async function addValues(sig) {
    console.log("entra a addvalues");
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(scaAddress, SCA.abi, signer);
      console.log(sig.signature, sig.message, sig.address);
      const transaction = await contract.supply(sig.signature, sig.message);
      await transaction.wait();
    }
  }

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // IPFS

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
      const contract = new ethers.Contract(scaAddress, SCA.abi, provider);
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
    <>
      {role === "Supplier" ? (
        <Supplier />
      ) : role === "Carrier" ? (
        <Carrier />
      ) : (
        <Customer />
      )}
    </>
    // <div className="flex flex-col justify-center text-center bg-custom-background">
    //   {ipfs && (
    //     <>
    //       <h3 className="text-3xl font-bold text-custom-back">
    //         IPFS Supply Chain Assurance
    //       </h3>
    //       <div className="flex items-start mb-6"> </div>

    //       {role === "Supplier" && (
    //         <h1 className="text-xl font-semibold text-gray-900 text-center">
    //           1. Carrier registration
    //         </h1>
    //       )}

    //       <div className="grid mb-2 md:grid-cols-3">
    //         <div> </div>
    //         <div>
    //           {role === "Supplier" && (
    //             <div>
    //               <label
    //                 for="last_name"
    //                 className="block mb-4 text-sm font-medium text-gray-900 "
    //               >
    //                 Add carrier
    //               </label>

    //               <Input
    //                 // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5  "
    //                 onChange={(e) => setCarrier(e.target.value)}
    //                 label="Add Carrier"
    //                 required
    //               />

    //               <div className="flex items-start mb-6"></div>
    //               <p>{regok}</p>
    //             </div>
    //           )}

    //           {role === "Supplier" && (
    //             <Button onClick={registerCarrierCust}>Register</Button>
    //           )}
    //           <br></br>
    //         </div>
    //       </div>

    //       <div className="flex items-start mb-6"></div>

    //       {role === "Supplier" && (
    //         <h1 className="text-xl font-semibold text-gray-700 text-center">
    //           2. Upload the photo of the goods to be transported
    //         </h1>
    //       )}

    //       {role === "Supplier" && (
    //         <div className="flex items-start mb-6"> </div>
    //       )}
    //       {role === "Supplier" && (
    //         <form onSubmit={onSubmitHandler}>
    //           <div className="flex justify-center">
    //             <div className="mb-3 w-96">
    //               <input
    //                 className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    //                 type="file"
    //                 id="file"
    //               />
    //             </div>
    //           </div>

    //           <Button className="bg-black" type="submit">
    //             Upload file
    //           </Button>
    //         </form>
    //       )}
    //     </>
    //   )}

    //   {role === "Supplier" && (
    //     <div className="flex flex-wrap justify-center">
    //       {images.map((image, index) => (
    //         <img
    //           alt={`Uploaded #${index + 1}`}
    //           src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
    //           className="p-1 bg-white border rounded max-w-sm"
    //           style={{ maxWidth: "400px", margin: "15px" }}
    //           key={image.cid.toString() + index}
    //         />
    //       ))}
    //     </div>
    //   )}

    //   {images.map((image, index) => (
    //     <h3>Path:{image.path}</h3>
    //   ))}

    //   <h3>{cid}</h3>

    //   {role === "Carrier" && (
    //     <h1 className="text-xl font-semibold text-gray-700 text-center">
    //       1. The carrier signs the photo
    //     </h1>
    //   )}

    //   {role === "Carrier" && (
    //     <form className="m-4" onSubmit={handleSign}>
    //       <textarea
    //         required
    //         type="text"
    //         name="message"
    //         className="textarea w-4/6 h-24 textarea-bordered focus:ring focus:outline-none"
    //         placeholder="Message"
    //       />

    //       <div className="flex items-start mb-6"> </div>

    //       <Button type="submit">Sign message</Button>
    //       {error}
    //     </form>
    //   )}

    //   <div className="grid grid-cols-3 gap-4" />
    //   <div className="flex items-start mb-6"></div>

    //   <br></br>

    //   <br></br>

    //   <div className="flex items-start mb-6"> </div>

    //   <div className="hashing-form">
    //     {role === "Supplier" && (
    //       <h1 className="text-xl font-semibold text-gray-700 text-center">
    //         3. Download photo from IPFS
    //       </h1>
    //     )}

    //     {role === "Carrier" && (
    //       <h1 className="text-xl font-semibold text-gray-700 text-center">
    //         2. Download photo from IPFS
    //       </h1>
    //     )}

    //     {role === "Customer" && (
    //       <h1 className="text-xl font-semibold text-gray-700 text-center">
    //         Download photo from IPFS
    //       </h1>
    //     )}

    //     <div>
    //       <div className="flex items-start mb-6"></div>
    //     </div>
    //     <div className="grid mb-2 md:grid-cols-3">
    //       <div> </div>
    //       <div>
    //         <label
    //           for="first_name"
    //           className="block mb-2 text-sm font-medium text-gray-900 "
    //         >
    //           Download photo
    //         </label>
    //         <input
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5"
    //           onChange={(e) => setBiddoc(e.target.value)}
    //           placeholder="Input CID"
    //           required
    //         />
    //       </div>
    //       <div> </div>
    //       <div> </div>
    //       {biddoc && (
    //         <div className="flex flex-wrap justify-center">
    //           <img
    //             alt="Bidding document"
    //             src={"https://skywalker.infura-ipfs.io/ipfs/" + biddoc}
    //             style={{ maxWidth: "400px", margin: "15px" }}
    //             onError={(e) => {
    //               e.target.src =
    //                 "https://skywalker.infura-ipfs.io/ipfs/QmYEGHkGxNut1zGGFiW6ERNgCcV5cwmXcpZgtT2NXUtGDP"; //replacement image imported above
    //               e.target.style = "padding: 8px; margin: 16px"; // inline styles in html format
    //             }}
    //           />
    //         </div>
    //       )}
    //     </div>

    //     {role === "Carrier" && (
    //       <h1 className="text-xl font-semibold text-gray-700 text-center">
    //         3.Verification of the CID's authenticity
    //       </h1>
    //     )}
    //     {role === "Carrier" && (
    //       <form className="m-4" onSubmit={handleVerification}>
    //         <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
    //           <main className="mt-4 p-4">
    //             <div className="">
    //               <div className="my-3">
    //                 <textarea
    //                   required
    //                   type="text"
    //                   name="message"
    //                   className="textarea w-4/6 h-24 textarea-bordered focus:ring focus:outline-none"
    //                   placeholder="Message"
    //                 />
    //               </div>
    //             </div>
    //           </main>
    //           <footer className="p-4">
    //             <Button type="submit">Verify</Button>
    //             {error}
    //           </footer>

    //           <p>{validcid}</p>
    //         </div>
    //       </form>
    //     )}
    //   </div>
    // </div>
  );
}

export default App;
