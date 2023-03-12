import "./index.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Supplier from "./pages/Supplier";
import Carrier from "./pages/Carrier";
import Customer from "./pages/Customer";
import SCA from "./artifacts/contracts/SCA.sol/SCA.json";

// Update with the contract address after deploying the smart contract
// const scaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// insert your infura project credientals

function App() {
  let [role, setRole] = useState("");
  //const scaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const scaAddress = "0x8787C1F9353c945fD1B79a6565F3e44aa236B137";

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

  // IPFS

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
  );
}

export default App;
