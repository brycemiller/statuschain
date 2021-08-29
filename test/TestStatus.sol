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

        Status.Update[] memory updates;
        Status.Update memory update;
        uint initialAmount = 20;
        uint initialCursor = 0;
        uint count;
        uint expectedAmount;
        uint expectedCursor;
        uint fetchAmount;
        uint nextCursor;

        for (uint i = 0; i < initialAmount; i++) {
            status.addUpdate(
                Status.Severity(i % 5),
                string(abi.encodePacked("Update ", i)),
                string(abi.encodePacked("Something is happening! ", i))
            );
        }

        count = status.getCount();

        Assert.equal(
            count,
            initialAmount,
            string(abi.encodePacked("Count after addUpdate should be ", initialAmount))
        );

        // Test basic functionality - getUpdates
        fetchAmount = 10;
        expectedAmount = 10;
        expectedCursor = 10;
        (updates, nextCursor) = status.getUpdates(initialCursor, fetchAmount);

        Assert.equal(
            updates.length,
            expectedAmount,
            string(abi.encodePacked("Length of updates should be ", expectedAmount))
        );
        Assert.equal(updates[0].id, 0, "Id of first update should be 0");
        Assert.equal(updates[updates.length-1].id, 9, "Id of last update should be 9");

        for (uint i = 0; i < expectedAmount; i++) {
            update = updates[i];
            Assert.equal(update.id, i, "Id is not correct");
            Assert.equal(
                uint(update.impact),
                uint(i % 5),
                "Impact is not correct"
            );
            Assert.equal(
                update.heading,
                string(abi.encodePacked("Update ", i)),
                "Heading is not correct"
            );
        }

        Assert.equal(
            nextCursor,
            expectedCursor,
            string(abi.encodePacked("Next cursor should be ", expectedCursor))
        );

        // Test fetching next amount - getUpdates
        fetchAmount = 5;
        expectedAmount = 5;
        expectedCursor = 15;
        (updates, nextCursor) = status.getUpdates(nextCursor, fetchAmount);

        Assert.equal(
            updates.length,
            expectedAmount,
            string(abi.encodePacked("Length of updates should be ", expectedAmount))
        );
        Assert.equal(updates[0].id, 10, "Id of first update should be 10");
        Assert.equal(updates[updates.length-1].id, 14, "Id of last update should be 14");

        for (uint i = nextCursor; i < expectedAmount; i++) {
            update = updates[i];
            Assert.equal(update.id, i, "Id is not correct");
            Assert.equal(
                uint(update.impact),
                uint(i % 5),
                "Impact is not correct"
            );
            Assert.equal(
                update.heading,
                string(abi.encodePacked("Update ", i)),
                "Heading is not correct"
            );
        }

        Assert.equal(
            nextCursor,
            expectedCursor,
            string(abi.encodePacked("Next cursor should be ", expectedCursor))
        );

        // Test fetching more updates than are available
        fetchAmount = 100;
        expectedAmount = 5;
        expectedCursor = 20;
        (updates, nextCursor) = status.getUpdates(nextCursor, fetchAmount);

        Assert.equal(
            updates.length,
            expectedAmount,
            string(abi.encodePacked("Length of updates should be ", expectedAmount))
        );
        Assert.equal(updates[0].id, 15, "Id of first update should be 10");
        Assert.equal(updates[updates.length-1].id, 19, "Id of last update should be 14");

        for (uint i = nextCursor; i < expectedAmount; i++) {
            update = updates[i];
            Assert.equal(update.id, i, "Id is not correct");
            Assert.equal(
                uint(update.impact),
                uint(i % 5),
                "Impact is not correct"
            );
            Assert.equal(
                update.heading,
                string(abi.encodePacked("Update ", i)),
                "Heading is not correct"
            );
        }

        Assert.equal(
            nextCursor,
            expectedCursor,
            string(abi.encodePacked("Next cursor should be ", expectedCursor))
        );

        // Test fetching with too large cursor
        fetchAmount = 10;
        expectedAmount = 0;
        expectedCursor = 20;
        (updates, nextCursor) = status.getUpdates(nextCursor, fetchAmount);

        Assert.equal(
            updates.length,
            expectedAmount,
            string(abi.encodePacked("Length of updates should be ", expectedAmount))
        );

        Assert.equal(
            nextCursor,
            expectedCursor,
            string(abi.encodePacked("Next cursor should be ", expectedCursor))
        );

        // Test fetching 0 updates
        // Test fetching -1 updates
    }
}
