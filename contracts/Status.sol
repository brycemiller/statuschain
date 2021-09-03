//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Status {
    uint32 count;
    uint8 maxLimit;

    enum Severity {
        CRITICAL,
        MAJOR,
        MINOR,
        NONE,
        MAINTENANCE
    }

    struct Update {
        uint32 id;
        uint32 timestamp;
        Severity impact;
        string heading;
        string message;
    }

    mapping(uint32 => Update) public updates;

    constructor() {
        count = 0;
        maxLimit = 100;
    }

    function getCount() public view returns(uint32) {
        return count;
    }

    function addUpdate(
        Severity severity,
        string calldata heading,
        string calldata message
    )
        public
    {
        updates[count] = Update(
            count,
            uint32(block.timestamp),
            severity,
            heading,
            message
        );
        count++;
    }

    function getUpdate(uint32 id)
        public
        view
        returns (Update memory)
    {
        return updates[id];
    }

    function getUpdates(uint32 cursor, uint8 amount)
        public
        view
        returns (Update[] memory, uint32 nextCursor)
    {
        if (amount > (count - cursor)) {
            amount = uint8(count - cursor);
        }

        Update[] memory values = new Update[](amount);

        for (uint8 i = 0; i < amount; i++) {
            values[i] = updates[cursor + i];
        }

        return (values, cursor + amount);
    }
}
