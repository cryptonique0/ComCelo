// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract MockFailingTarget {
    function willRevert() external pure {
        revert("forced-fail");
    }
}
