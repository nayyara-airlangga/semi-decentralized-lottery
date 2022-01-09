const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat.config");
const { deployLottery } = require("../../scripts/utils");

if (developmentChains.includes(network.name)) {
  describe("Lottery - Entrance Fee", function () {
    it("Should show the accurate entrance fee", async function () {
      const lottery = await deployLottery();

      expect(await lottery.getEntranceFee()).to.equal(
        ethers.utils.parseUnits("16666666666666666", 0)
      );
    });
  });

  describe("Lottery - Can't Enter Unless Started", function () {
    it("Should raise an error if tried to enter before lottery is started", async function () {
      const lottery = await deployLottery();

      const [owner, account1] = await ethers.getSigners();

      const entranceFee = await lottery.getEntranceFee();

      try {
        await lottery.connect(account1).enter({ value: entranceFee + 1 });
      } catch (error) {
        expect(error.message).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Sorry, we're currently not opening a lottery'"
        );
      }
    });
  });

  describe("Lottery - Can Start and Enter Lottery", function () {
    it("Owner should be able to start and players can enter the lottery", async function () {
      const lottery = await deployLottery();

      const [owner, account1] = await ethers.getSigners();

      const entranceFee = await lottery.getEntranceFee();

      try {
        await lottery.connect(account1).enter({ value: entranceFee + 1 });
      } catch (error) {
        expect(error.message).to.equal(
          "VM Exception while processing transaction: reverted with reason string 'Sorry, we're currently not opening a lottery'"
        );
      }
    });
  });
}
