const { getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains, MIN_DELAY } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("-----------------------------------------")

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
        waitConfirmations: 1,
    })
    log(`timeLock at ${timeLock.address}`)
}
