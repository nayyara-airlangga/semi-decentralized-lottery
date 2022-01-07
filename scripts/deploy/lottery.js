const hre = require("hardhat");

const main = async () => {
  const networkName = hre.network.name;

  const Lottery = await hre.ethers.getContractFactory("Lottery");

  if (networkName !== "hardhat" && networkName !== "localhost") {
    console.log("Deploying to the", networkName, "network");

    const ethUSDPriceFeed = hre.config.networks[networkName].ethUSDPriceFeed;
    const vrfCoordinatorAddress =
      hre.config.networks[networkName].vrfCoordinatorAddress;
    const vrfLinkToken = hre.config.networks[networkName].vrfLinkToken;
    const vrfKeyhash = hre.config.networks[networkName].vrfKeyhash;
    const vrfFee = hre.config.networks[networkName].vrfFee;

    const lottery = await Lottery.deploy(
      ethUSDPriceFeed,
      vrfCoordinatorAddress,
      vrfLinkToken,
      vrfFee,
      vrfKeyhash
    );
    await lottery.deployed();

    console.log("Lottery deployed to:", lottery.address);
  } else {
    console.log("Deploying to the", networkName, "network with mocks...");

    const MockV3Aggregator = await hre.ethers.getContractFactory(
      "MockV3Aggregator"
    );
    const mockV3Aggregator = await MockV3Aggregator.deploy(8, 3 * 10 ** 11);
    await mockV3Aggregator.deployed();

    const ethUSDPriceFeed = mockV3Aggregator.address;

    console.log("MockV3Aggregator deployed to:", mockV3Aggregator.address);

    const lottery = await Lottery.deploy(ethUSDPriceFeed);
    await lottery.deployed();

    console.log("Lottery deployed to:", lottery.address);
  }
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
