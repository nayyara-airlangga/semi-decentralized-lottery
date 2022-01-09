const hre = require("hardhat");

const main = async () => {
  const [owner, account1] = await hre.ethers.getSigners();
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  const lottery = await hre.ethers.getContractAt("Lottery", contractAddress);
  const entranceFee = await lottery.getEntranceFee();

  await lottery.connect(account1).enter({ value: entranceFee + 1 });
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
