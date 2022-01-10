const hre = require("hardhat");
const { fundWithLink } = require("../utils");

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const networkName = hre.network.name;
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const linkTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const lottery = await hre.ethers.getContractAt("Lottery", contractAddress);

  await fundWithLink(contractAddress, linkTokenAddress, networkName);

  const endLottery = await lottery.connect(owner).endLottery();
  await endLottery.wait();

  setInterval(() => {}, 60000);

  const recentWinner = await lottery.recentWinner();

  console.log(recentWinner, "is the new winner");
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
