require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

//const ALCHEMY_API_KEY = "2DxLS-uGeRkgAF1iNLkJCKHzWUAdk2Sw";
//const GOERLI_PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

/** @type import('hardhat/config').HardhatUserConfig */

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
.addParam("account", "The account's address")
.setAction(async taskArgs => {
  const account = web3.utils.toChecksumAddress(taskArgs.account);
  const balance = await web3.eth.getBalance(account);

  console.log(web3.utils.fromWei(balance, "ether"), "ETH");
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}

//module.exports = {
  //solidity: "0.8.9",
  //defaultNetwork: "hardhat",
  //paths: {
   // artifacts: './src/artifacts',
   //defaultNetwork: "hyperspace",
  //},
  //networks: {
    //hyperspace: {
      //chainId: 3141,
      //url: "https://api.hyperspace.node.glif.io/rpc/v1",
      //accounts: [process.env.PRIVATE_KEY],
  //},
    //hardhat: {
      //chainId: 1337,
    //},
    //goerli: {
      //url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      //accounts : [GOERLI_PRIVATE_KEY]
   // }
    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/projectid",
    //   accounts: [process.env.a2key]
    // },
     //rinkeby: {
       //url: "https://rinkeby.infura.io/v3/2DxpAMDUxnEwmX2dp5U3YrLjlRZ",
       //accounts: [process.env.a2key]
    // }
  //},
//} 
//};







// This is an original version
/* module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true
    }
  }
}; */
