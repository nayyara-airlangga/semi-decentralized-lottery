const hre = require("hardhat");
const { deployLottery } = require("../utils");

const main = async () => {
  const networkName = hre.network.name;

  await deployLottery(networkName);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
