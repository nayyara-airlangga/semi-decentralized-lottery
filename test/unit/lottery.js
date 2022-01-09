const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat.config");
const { deployLottery, fundWithLink } = require("../../scripts/utils");

const networkName = network.name;

if (developmentChains.includes(networkName)) {
  describe("Lottery - Entrance Fee", () => {
    it("Should show the accurate entrance fee", async () => {
      const { lottery } = await deployLottery();

      expect(await lottery.getEntranceFee()).to.equal(
        ethers.utils.parseUnits("16666666666666666", 0)
      );
    });
  });

  describe("Lottery - Can't Enter Unless Started", () => {
    it("Should raise an error if tried to enter before lottery is started", async () => {
      const { lottery } = await deployLottery();

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

  describe("Lottery - Can Start and Enter Lottery", () => {
    it("Owner should be able to start and players can enter the lottery", async () => {
      const { lottery } = await deployLottery();

      const [owner, account1] = await ethers.getSigners();

      const entranceFee = await lottery.getEntranceFee();

      await lottery.connect(owner).startLottery();

      await lottery.connect(account1).enter({ value: entranceFee + 1 });

      expect(await lottery.players(0)).to.equal(account1.address);
    });
  });

  describe("Lottery - Can End Lottery", () => {
    it("Owner should be able to end the lottery", async () => {
      const { lottery, linkTokenAddress } = await deployLottery();

      const [owner, account1] = await ethers.getSigners();

      const entranceFee = await lottery.getEntranceFee();

      await lottery.connect(owner).startLottery();

      await lottery.connect(account1).enter({ value: entranceFee + 1 });

      await fundWithLink(lottery.address, linkTokenAddress, networkName);

      await lottery.connect(owner).endLottery();

      expect(await lottery.lotteryState()).to.equal(2);
    });
  });

  describe("Lottery - Can Pick Winner Correctly", () => {
    it("Should pick a winner correctly", async () => {
      const { lottery, linkTokenAddress } = await deployLottery();

      const [owner, account1, account2, account3] = await ethers.getSigners();

      const entranceFee = await lottery.getEntranceFee();

      await lottery.connect(owner).startLottery();

      await lottery.connect(account1).enter({ value: entranceFee + 1 });
      await lottery.connect(account2).enter({ value: entranceFee + 1 });
      await lottery.connect(account3).enter({ value: entranceFee + 1 });

      await fundWithLink(lottery.address, linkTokenAddress, networkName);
    });
  });
}
