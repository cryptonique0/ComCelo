// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloUnits
/// @notice Defines unit archetypes and unit state management for ComCelo.
contract ComCeloUnits is Ownable, Pausable {
    // Base Mainnet Deployed Addresses
    address public constant UNITS_ADDRESS = 0x7230b1E0efAa8578a418B42ce92bE6c78ceBa59E;
    address public constant TREASURY_ADDRESS = 0xd32283CcD387A58FF14314f2A103b58c96Bb61F9;
    address public constant CORE_ADDRESS = 0xa70b1163dB94bfdB38C11B820cF2C7094372c134;
    address public constant MATCHMAKER_ADDRESS = 0x7F5ACfe82A31498e057ebE2fE11be6AB0135a293;
    enum UnitType {
        Hero,
        Soldier,
        Archer
    }

    struct UnitTemplate {
        uint8 baseHp;
        uint8 baseAttack;
        uint8 baseDefense;
        uint8 baseRange;
        string name;
    }

    mapping(UnitType => UnitTemplate) public templates;

    event UnitTemplateUpdated(UnitType indexed unitType, string name);

    constructor() {
        // Initialize default unit templates
        templates[UnitType.Hero] = UnitTemplate(100, 15, 10, 1, "Hero");
        templates[UnitType.Soldier] = UnitTemplate(40, 12, 8, 1, "Soldier");
        templates[UnitType.Archer] = UnitTemplate(30, 10, 5, 3, "Archer");
    }

    function getTemplate(UnitType unitType) external view returns (UnitTemplate memory) {
        return templates[unitType];
    }

    function updateTemplate(UnitType unitType, UnitTemplate memory template) external onlyOwner {
        templates[unitType] = template;
        emit UnitTemplateUpdated(unitType, template.name);
    }
}
