require("dotenv").config();

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.PRIVATE_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

// Mainnet Configs
const mainnetRPCUrl = process.env.MAINNET_RPC_URL;
const mainnetEthUSDPriceFeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
const mainnetVRFCoordinatorAddress =
  "0xf0d54349aDdcf704F77AE15b96510dEA15cb7952";
const mainnetVRFLinkToken = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
const mainnetVRFKeyhash =
  "0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445";
const mainnetVRFFee = 2 * 10 ** 18;

// Kovan Testnet Configs
const kovanRPCUrl = process.env.KOVAN_RPC_URL;
const kovanEthUSDPriceFeed = "0x9326BFA02ADD2366b30bacB125260Af641031331";
const kovanVRFCoordinatorAddress = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9";
const kovanVRFLinkToken = "0xa36085F69e2889c224210F603D836748e7dC0088";
const kovanVRFKeyhash =
  "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4";
const kovanVRFFee = 0.1 * 10 ** 18;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {},
    mainnet: {
      url: mainnetRPCUrl,
      accounts: [privateKey],
      ethUSDPriceFeed: mainnetEthUSDPriceFeed,
      vrfCoordinatorAddress: mainnetVRFCoordinatorAddress,
      vrfLinkToken: mainnetVRFLinkToken,
      vrfKeyhash: mainnetVRFKeyhash,
      vrfFee: mainnetVRFFee,
    },
    kovan: {
      url: kovanRPCUrl,
      accounts: [privateKey],
      ethUSDPriceFeed: kovanEthUSDPriceFeed,
      vrfCoordinatorAddress: kovanVRFCoordinatorAddress,
      vrfLinkToken: kovanVRFLinkToken,
      vrfKeyhash: kovanVRFKeyhash,
      vrfFee: kovanVRFFee,
    },
  },
  etherscan: {
    apiKey: etherscanApiKey,
  },
};
