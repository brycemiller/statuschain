const Status = artifacts.require("Status");

contract("Status", accounts => {
    it("should have count = 0", () => {
        Status.deployed()
            .then(instance => instance.getCount())
            .then(count => assert.equal(count, 0, `Count was ${count}`));
    });

    it("should have count = 1", () => {
        Status.deployed()
            .then(instance => 
                instance.addUpdate(
                    Status.Severity.MAINTENANCE,
                    "Maintenance 29.08.2021",
                    "Scheduled maintenance of Amazin's platform on Sunday, 29th of August"
                )
            )
            .then(count => assert.equal(count, 1, `Count was ${count}`));
    });
});