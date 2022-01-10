const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat.config");
const { fundWithLink } = require("../../scripts/utils");

const networkName = network.name;

// Run tests on testnet only
if (!developmentChains.includes(networkName)) {
  describe("Integration Tests - Lottery - Can Pick Winner", function () {
    this.timeout(0);

    let lottery;

    this.beforeEach(async () => {
      lottery = await ethers.getContractAt(
        "Lottery",
        "0xCA168c3f554Ef456102C33924EFEafab35AAD127"
      );
    });

    it("Should be able to pick a winner", async () => {
      const linkTokenAddress = networkConfig[networkName].linkToken;
      const owner = await ethers.getSigner(
        "0xE1103D13af6F569c686061fCE722C1637Fbd4dD0"
      );
      const account1 = await ethers.getSigner(
        "0xca414289D2C51AEc038bd8A69eA502B0FeEc4212"
      );
      const entranceFee = await lottery.getEntranceFee();

      const startLottery = await lottery.connect(owner).startLottery();
      const startReceipt = await startLottery.wait();

      const enter = await lottery
        .connect(account1)
        .enter({ value: entranceFee + 1 });
      const enterReceipt = await enter.wait();

      await fundWithLink(lottery.address, linkTokenAddress, networkName);

      const endLottery = await lottery.connect(owner).endLottery();
      const endReceipt = await endLottery.wait();
      console.log(endReceipt);

      expect(await lottery.recentWinner()).to.equal(account1.address);
      expect(
        await ethers.getDefaultProvider().getBalance(lottery.address)
      ).to.equal(0);
    });
  });
}
