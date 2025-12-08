// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title ComCeloMetaTxRelay
/// @notice Handles meta-transactions and gas sponsorship for ComCelo players.
contract ComCeloMetaTxRelay is Ownable, Pausable {
    using ECDSA for bytes32;

    address public gameContractAddress;
    mapping(address => uint256) public nonces;
    uint256 public maxGasSponsorPerTx = 1 ether;

    event MetaTxExecuted(address indexed relayer, address indexed signer, uint256 nonce);
    event GameContractUpdated(address indexed newAddress);
    event MaxGasSponsorUpdated(uint256 newMax);

    constructor(address _gameContractAddress) {
        gameContractAddress = _gameContractAddress;
    }

    function executeMetaTx(
        address signer,
        bytes calldata functionData,
        uint256 nonce,
        bytes calldata signature
    ) external payable onlyOwner whenNotPaused returns (bytes memory) {
        require(nonce == nonces[signer], "Invalid nonce");
        require(msg.value <= maxGasSponsorPerTx, "Gas sponsorship exceeds limit");

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encode(signer, functionData, nonce, address(this)))
            )
        );

        address recovered = digest.recover(signature);
        require(recovered == signer, "Invalid signature");

        nonces[signer]++;

        (bool success, bytes memory result) = gameContractAddress.call(functionData);
        require(success, "Meta-tx execution failed");

        emit MetaTxExecuted(msg.sender, signer, nonce);
        return result;
    }

    function setGameContractAddress(address _gameContractAddress) external onlyOwner {
        require(_gameContractAddress != address(0), "Invalid address");
        gameContractAddress = _gameContractAddress;
        emit GameContractUpdated(_gameContractAddress);
    }

    function setMaxGasSponsor(uint256 _maxGasSponsorPerTx) external onlyOwner {
        maxGasSponsorPerTx = _maxGasSponsorPerTx;
        emit MaxGasSponsorUpdated(_maxGasSponsorPerTx);
    }

    function getNonce(address signer) external view returns (uint256) {
        return nonces[signer];
    }

    receive() external payable {}
}
