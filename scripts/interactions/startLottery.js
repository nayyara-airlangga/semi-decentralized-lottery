const hre = require("hardhat");

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  const lottery = await hre.ethers.getContractAt("Lottery", contractAddress);

  await lottery.connect(owner).startLottery();
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
