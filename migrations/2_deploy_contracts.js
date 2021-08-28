let Status = artifacts.require("../Status.sol");

module.exports = (deployer) => {
    deployer.deploy(Status);
};
