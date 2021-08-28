const { assert } = require("console");

const Status = artifacts.require("Status");
const update0 = {
    id: 0,
    severity: Status.Severity.MAINTENANCE,
    heading: "Maintenance 29.08.2021",
    message: "Scheduled maintenance of Amazin's platform on Sun., 29th of Aug."
};

contract("Status", accounts => {
    it("should have count = 0", () => {
        Status.deployed()
            .then(instance => instance.getCount())
            .then(count => assert.equal(count, 0, `Count was ${count}`));
    });

    it("should have count = 1", () => {
        Status.deployed()
            .then(instance => instance.addUpdate(
                update0.severity, update0.heading, update0.message))
            .then(count => assert.equal(count, 1, `Count was ${count}`));
    });

    it("should have update0", () => {
        Status.deployed()
            .then(instance => instance.getUpdate(0))
            .then(update => assert.equal(update[0], 0, `id was ${update[0]}`));
    });
});
