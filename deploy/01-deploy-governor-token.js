const { getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async (/*{ deployments, getNamedAccounts }*/) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("-----------------------------------------")
    const governance_token = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })

    log(`GovernanceToken at ${governance_token.address}`)
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API
    ) {
        await verify(governance_token.address, [])
    }
    log(`Delegating to ${deployer}`)
    await delegate(governance_token.address, deployer)
    log("Delegated!")
}

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt(
        "GovernanceToken",
        governanceTokenAddress
    )
    const transactionResponse = await governanceToken.delegate(delegatedAccount)
    await transactionResponse.wait(1)
    console.log(
        `Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`
    )
}

module.exports.tags = ["all", "gov_token"]
