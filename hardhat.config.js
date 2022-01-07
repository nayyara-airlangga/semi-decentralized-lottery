require("dotenv").config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

// Mainnet Configs
const mainnetRPCUrl = process.env.MAINNET_RPC_URL;

// Kovan Testnet Configs
const kovanRPCUrl = process.env.KOVAN_RPC_URL;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {},
    mainnet: {
      url: mainnetRPCUrl,
      accounts: [privateKey],
    },
    kovan: {
      url: kovanRPCUrl,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
  solidity: {
    compilers: [
      { version: "0.8.7" },
      {
        version: "0.4.24",
      },
    ],
  },
};
