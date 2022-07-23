const networkConfig = {
    31337: {
        name: "localhost",
    },
    4: {
        name: "rinkeby",
    },
}

const developmentChains = ["localhost", "hardhat"]
const MIN_DELAY = 3600
const QUORUM_PERCENTAGE = 5
const VOTING_PERIOD = 5
const VOTING_DELAY = 2
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const NEW_STORE_VALUE = 123
const FUNC = "store"
const PROPOSAL_DESCRIPTION = "proposal #1: store 123 in the box!"
const proposalsFile = "proposals.json"

module.exports = {
    networkConfig,
    developmentChains,
    MIN_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
    VOTING_DELAY,
    ADDRESS_ZERO,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
    proposalsFile,
}
