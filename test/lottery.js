const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery - Entrance Fee", function () {
  it("Should show the accurate entrance fee", async function () {
    const MockV3Aggregator = await ethers.getContractFactory(
      "MockV3Aggregator"
    );
    const mockV3Aggregator = await MockV3Aggregator.deploy(8, 3 * 10 ** 11);
    await mockV3Aggregator.deployed();

    const ethUSDPriceFeed = mockV3Aggregator.address;

    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(ethUSDPriceFeed);
    await lottery.deployed();

    expect(await lottery.getEntranceFee()).to.equal(
      ethers.utils.parseUnits("16666666666666666", 0)
    );
  });
});
