// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.18;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RemittanceToken is ERC20 {
    constructor() ERC20("Remittance Token", "REM") {
        _mint(
            msg.sender,
            100000000000000000000000000000000000000000000000000000000000000
        );
    }
}
