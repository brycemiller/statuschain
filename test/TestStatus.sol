//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "truffle/Assert.sol";
import "../contracts/Status.sol";

contract TestStatus {
    function testInitialCountIs0() public {
        Status status = new Status();

        Assert.equal(status.getCount(), 0, "Initial count should be 0");
    }

    function testAddUpdateAndGetUpdate() public {
        Status status = new Status();
        status.addUpdate(
            Status.Severity.MAINTENANCE,
            "Maintenance 29.08.2021",
            "Scheduled maintenance of Amazin's platform on Sun., 29th of Aug."
        );

        uint count = status.getCount();
        Status.Update memory update = status.getUpdate(0);

        Assert.equal(count, 1, "Count after addUpdate should be 1");
        Assert.equal(update.id, 0, "Id for Update at 0 should be 0");
        Assert.equal(
            uint(update.impact),
            uint(Status.Severity.MAINTENANCE),
            "Impact for Update at 0 should be MAINTENANCE"
        );
        Assert.equal(
            update.heading,
            "Maintenance 29.08.2021",
            "Heading for Update at 0 is wrong"
        );
        Assert.equal(
            update.message,
            "Scheduled maintenance of Amazin's platform on Sun., 29th of Aug.",
            "Message for Update at 0 is wrong"
        );
    }

    function testGetUpdates() public {
        Status status = new Status();

        for (uint i = 0; i < 20; i++) {
            status.addUpdate(
                Status.Severity(i % 5),
                string(abi.encodePacked("Update ", i)),
                string(abi.encodePacked("Something is happening! ", i))
            );
        }

        uint count = status.getCount();

        Assert.equal(count, 20, "Count after addUpdate should be 20");
    }
}
