const { network } = require("hardhat")

const mineBlocks = async (number) => {
    console.log("Mining Blocks...")
    for (let i = 0; i < number; i++) {
        await network.provider.request({
            method: "evm_mine",
            params: [],
        })
    }
}

module.exports = { mineBlocks }
