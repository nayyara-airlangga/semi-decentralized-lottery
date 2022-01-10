require("dotenv").config();

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const privateKeyOwner = process.env.PRIVATE_KEY_OWNER;
const privateKeyAccount1 = process.env.PRIVATE_KEY_ACCOUNT1;
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
      accounts: [privateKeyOwner, privateKeyAccount1],
      timeout: 180000,
    },
    kovan: {
      url: kovanRPCUrl,
      accounts: [privateKeyOwner, privateKeyAccount1],
      timeout: 180000,
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
