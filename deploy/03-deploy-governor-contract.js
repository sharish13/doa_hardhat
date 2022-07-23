const { deployments, getNamedAccounts } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    MIN_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
    VOTING_DELAY,
} = require("../helper-hardhat-config")

module.exports = async () => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")

    log("----------------------------------------------------")
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            QUORUM_PERCENTAGE,
            VOTING_PERIOD,
            VOTING_DELAY,
        ],
        log: true,
        waitConfirmations: 1,
    })
    log(`GovernorContract at ${governorContract.address}`)
}
