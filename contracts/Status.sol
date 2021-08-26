//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Status {
    uint count;
    uint maxLimit;

    enum Severity {
        CRITICAL,
        MAJOR,
        MINOR,
        NONE,
        MAINTENANCE
    }

    struct Update {
        uint id;
        Severity impact;
        string heading;
        string message;
    }

    mapping(uint => Update) public updates;

    constructor() {
        count = 0;
        maxLimit = 100;
    }

    function addUpdate(
        Severity severity,
        string calldata heading,
        string calldata message
    )
        public
    {
        count++;
        updates[count] = Update(count, severity, heading, message);
    }

    function getUpdate(uint id)
        public
        view
        returns (Update memory)
    {
        return updates[id];
    }

    function getUpdates(uint cursor, uint amount)
        public
        view
        returns (Update[] memory, uint nextCursor)
    {
        if (amount > (count - cursor)) {
            amount = count - cursor;
        }

        Update[] memory values = new Update[](amount);

        for (uint i = 0; i < amount; i++) {
            values[i] = updates[cursor + i];
        }

        return (values, cursor + amount);
    }
}
