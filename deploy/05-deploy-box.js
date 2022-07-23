const { deployments, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("------------------")
    const Box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    })

    log(`BoxContract at ${Box.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API
    ) {
        await verify(Box.address, [])
    }
    const boxContract = await ethers.getContract("Box")
    const timeLock = await ethers.getContract("TimeLock")
    const transferTx = await boxContract.transferOwnership(timeLock.address)
    await transferTx.wait(1)
}
