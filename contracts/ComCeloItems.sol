// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloItems
/// @notice ERC-1155 contract for cosmetics, consumables, and power-ups
contract ComCeloItems is ERC1155, Ownable, Pausable {
    string public name = "ComCelo Items";
    string public symbol = "CITEM";

    enum ItemType {
        Consumable,
        Cosmetic,
        PowerUp
    }

    struct Item {
        string name;
        string description;
        ItemType itemType;
        uint256 price;
        uint256 maxSupply;
        uint256 currentSupply;
    }

    mapping(uint256 => Item) public items;
    uint256 public nextItemId;

    event ItemCreated(uint256 indexed itemId, string name, ItemType itemType, uint256 price);
    event ItemPurchased(address indexed buyer, uint256 indexed itemId, uint256 amount, uint256 totalPrice);

    constructor() ERC1155("ipfs://QmExample/{id}.json") {}

    function createItem(
        string memory name,
        string memory description,
        ItemType itemType,
        uint256 price,
        uint256 maxSupply
    ) external onlyOwner returns (uint256 itemId) {
        itemId = nextItemId++;
        items[itemId] = Item({
            name: name,
            description: description,
            itemType: itemType,
            price: price,
            maxSupply: maxSupply,
            currentSupply: 0
        });

        emit ItemCreated(itemId, name, itemType, price);
    }

    function purchaseItem(uint256 itemId, uint256 amount) external payable whenNotPaused {
        require(itemId < nextItemId, "Item does not exist");
        Item storage item = items[itemId];
        require(item.currentSupply + amount <= item.maxSupply, "Insufficient supply");

        uint256 totalPrice = item.price * amount;
        require(msg.value >= totalPrice, "Insufficient payment");

        item.currentSupply += amount;
        _mint(msg.sender, itemId, amount, "");

        emit ItemPurchased(msg.sender, itemId, amount, totalPrice);

        // Refund excess
        if (msg.value > totalPrice) {
            (bool success,) = msg.sender.call{value: msg.value - totalPrice}("");
            require(success, "Refund failed");
        }
    }

    function getItem(uint256 itemId) external view returns (Item memory) {
        require(itemId < nextItemId, "Item does not exist");
        return items[itemId];
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }
}
