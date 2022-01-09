const { ethers } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../../helper-hardhat.config");

const deployLottery = async (networkName = "hardhat") => {
  if (developmentChains.includes(networkName)) {
    console.log("Deploying to the", networkName, "network with mocks...");

    const MockV3Aggregator = await ethers.getContractFactory(
      "MockV3Aggregator"
    );
    const mockV3Aggregator = await MockV3Aggregator.deploy(8, 3 * 10 ** 11);
    await mockV3Aggregator.deployed();

    const ethUSDPriceFeed = mockV3Aggregator.address;

    console.log("MockV3Aggregator deployed to:", mockV3Aggregator.address);

    const LinkToken = await ethers.getContractFactory("LinkToken");
    const linkToken = await LinkToken.deploy();
    await linkToken.deployed();

    const linkTokenAddress = linkToken.address;

    console.log("LinkToken deployed to:", linkToken.address);

    const VRFCoordinatorMock = await ethers.getContractFactory(
      "VRFCoordinatorMock"
    );
    const vrfCoordinatorMock = await VRFCoordinatorMock.deploy(
      linkTokenAddress
    );
    await vrfCoordinatorMock.deployed();

    const vrfCoordinator = vrfCoordinatorMock.address;

    console.log("VRFCoordinatorMock deployed to:", vrfCoordinatorMock.address);

    const keyhash = networkConfig.hardhat.keyhash;
    const fee = networkConfig.hardhat.fee;

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(
      ethUSDPriceFeed,
      vrfCoordinator,
      linkTokenAddress,
      fee,
      keyhash
    );
    await lottery.deployed();

    console.log("Lottery deployed to:", lottery.address);

    return { lottery, linkTokenAddress, vrfCoordinatorAddress: vrfCoordinator };
  }
  console.log("Deploying to the", networkName, "network");

  const ethUSDPriceFeed = networkConfig[networkName].ethUSDPriceFeed;
  const vrfCoordinator = networkConfig[networkName].vrfCoordinator;
  const linkToken = networkConfig[networkName].linkToken;
  const keyhash = networkConfig[networkName].keyhash;
  const fee = networkConfig[networkName].fee;

  const Lottery = await ethers.getContractFactory("Lottery");

  const lottery = await Lottery.deploy(
    ethUSDPriceFeed,
    vrfCoordinator,
    linkToken,
    fee,
    keyhash
  );
  await lottery.deployed();

  console.log("Lottery deployed to:", lottery.address);

  return {
    lottery,
    linkTokenAddress: linkToken,
    vrfCoordinatorAddress: vrfCoordinator,
  };
};

const fundWithLink = async (
  contractAddress,
  linkTokenAddress,
  networkName = "hardhat"
) => {
  const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddress);

  await linkToken.transfer(contractAddress, networkConfig[networkName].fee);
};

module.exports = {
  deployLottery,
  fundWithLink,
};
