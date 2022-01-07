const { ethers } = require("ethers");

const networkConfig = {
  hardhat: {
    keyhash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    fee: ethers.utils.parseUnits("1", 17),
  },
  localhost: {
    keyhash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    fee: ethers.utils.parseUnits("1", 17),
  },
  mainnet: {
    ethUSDPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    vrfCoordinator: "0xf0d54349aDdcf704F77AE15b96510dEA15cb7952",
    linkToken: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    keyhash:
      "0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445",
    fee: ethers.utils.parseUnits("2", 18),
  },
  kovan: {
    ethUSDPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
    vrfCoordinator: "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9",
    linkToken: "0xa36085F69e2889c224210F603D836748e7dC0088",
    keyhash:
      "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4",
    fee: ethers.utils.parseUnits("1", 17),
  },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
