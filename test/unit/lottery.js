const { expect } = require("chai");
const { ethers } = require("hardhat");
const { networkConfig } = require("../../helper-hardhat.config");

describe("Lottery - Entrance Fee", function () {
  it("Should show the accurate entrance fee", async function () {
    const MockV3Aggregator = await hre.ethers.getContractFactory(
      "MockV3Aggregator"
    );
    const mockV3Aggregator = await MockV3Aggregator.deploy(8, 3 * 10 ** 11);
    await mockV3Aggregator.deployed();

    const ethUSDPriceFeed = mockV3Aggregator.address;

    const LinkToken = await hre.ethers.getContractFactory("LinkToken");
    const linkToken = await LinkToken.deploy();
    await linkToken.deployed();

    const linkTokenAddress = linkToken.address;

    const VRFCoordinatorMock = await hre.ethers.getContractFactory(
      "VRFCoordinatorMock"
    );
    const vrfCoordinatorMock = await VRFCoordinatorMock.deploy(
      linkTokenAddress
    );
    await vrfCoordinatorMock.deployed();

    const vrfCoordinator = vrfCoordinatorMock.address;

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

    expect(await lottery.getEntranceFee()).to.equal(
      ethers.utils.parseUnits("16666666666666666", 0)
    );
  });
});
