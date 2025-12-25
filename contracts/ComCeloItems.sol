// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloItems
/// @notice Advanced ERC-1155 contract for cosmetics, consumables, power-ups with rarity, crafting, and marketplace
contract ComCeloItems is ERC1155, Ownable, Pausable {
    string public name = "ComCelo Items";
    string public symbol = "CITEM";

    enum ItemType {
        Consumable,
        Cosmetic,
        PowerUp
    }

    enum Rarity {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary
    }

    struct Item {
        string name;
        string description;
        ItemType itemType;
        Rarity rarity;
        uint256 price;
        uint256 maxSupply;
        uint256 currentSupply;
        uint8 seasonId;
        bool active;
        uint8 attackBonus;
        uint8 defenseBonus;
        uint16 effectId;
    }

    struct MarketplaceListing {
        address seller;
        uint256 itemId;
        uint256 amount;
        uint256 pricePerUnit;
        bool active;
        uint256 listedAt;
    }

    mapping(uint256 => Item) public items;
    mapping(uint256 => MarketplaceListing) public listings;
    mapping(address => mapping(uint256 => uint256)) public userListings;
    
    uint256 public nextItemId;
    uint256 public nextListingId;
    uint8 public currentSeason;
    uint256 public platformFeePercent = 5;

    event ItemCreated(uint256 indexed itemId, string name, ItemType itemType, Rarity rarity, uint256 price);
    event ItemPurchased(address indexed buyer, uint256 indexed itemId, uint256 amount, uint256 totalPrice);
    event ItemListed(uint256 indexed listingId, address indexed seller, uint256 indexed itemId, uint256 amount, uint256 pricePerUnit);
    event ItemSoldMarketplace(uint256 indexed listingId, address indexed buyer, uint256 amount, uint256 totalPrice);
    event ItemBurned(address indexed burner, uint256 indexed itemId, uint256 amount);
    event SeasonChanged(uint8 newSeason);
    event ListingCancelled(uint256 indexed listingId);

    constructor() ERC1155("ipfs://QmExample/{id}.json") {
        currentSeason = 1;
    }

    function createItem(
        string memory name,
        string memory description,
        ItemType itemType,
        Rarity rarity,
        uint256 price,
        uint256 maxSupply,
        uint8 attackBonus,
        uint8 defenseBonus,
        uint16 effectId
    ) external onlyOwner returns (uint256 itemId) {
        itemId = nextItemId++;
        items[itemId] = Item({
            name: name,
            description: description,
            itemType: itemType,
            rarity: rarity,
            price: price,
            maxSupply: maxSupply,
            currentSupply: 0,
            seasonId: currentSeason,
            active: true,
            attackBonus: attackBonus,
            defenseBonus: defenseBonus,
            effectId: effectId
        });

        emit ItemCreated(itemId, name, itemType, rarity, price);
    }

    /// @notice Purchase item directly from the shop
    function purchaseItem(uint256 itemId, uint256 amount) external payable whenNotPaused {
        require(itemId < nextItemId, "Item does not exist");
        Item storage item = items[itemId];
        require(item.active, "Item not available");
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

    /// @notice List item on marketplace for peer-to-peer trading
    function listItem(uint256 itemId, uint256 amount, uint256 pricePerUnit) external returns (uint256 listingId) {
        require(balanceOf(msg.sender, itemId) >= amount, "Insufficient balance");
        require(pricePerUnit > 0, "Price must be > 0");

        listingId = nextListingId++;
        listings[listingId] = MarketplaceListing({
            seller: msg.sender,
            itemId: itemId,
            amount: amount,
            pricePerUnit: pricePerUnit,
            active: true,
            listedAt: block.timestamp
        });

        userListings[msg.sender][itemId] = listingId;
        emit ItemListed(listingId, msg.sender, itemId, amount, pricePerUnit);
    }

    /// @notice Buy item from marketplace listing
    function buyFromMarketplace(uint256 listingId, uint256 amount) external payable {
        MarketplaceListing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(amount <= listing.amount, "Not enough items available");

        uint256 totalPrice = listing.pricePerUnit * amount;
        require(msg.value >= totalPrice, "Insufficient payment");

        // Deduct seller's balance and transfer to buyer
        _safeTransferFrom(listing.seller, msg.sender, listing.itemId, amount, "");

        // Calculate fee and send to owner
        uint256 fee = (totalPrice * platformFeePercent) / 100;
        uint256 sellerAmount = totalPrice - fee;

        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        // Send payment to seller
        (bool success,) = listing.seller.call{value: sellerAmount}("");
        require(success, "Payment to seller failed");

        // Refund excess to buyer
        if (msg.value > totalPrice) {
            (bool refundSuccess,) = msg.sender.call{value: msg.value - totalPrice}("");
            require(refundSuccess, "Refund failed");
        }

        emit ItemSoldMarketplace(listingId, msg.sender, amount, totalPrice);
    }

    /// @notice Cancel marketplace listing
    function cancelListing(uint256 listingId) external {
        MarketplaceListing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not listing owner");
        require(listing.active, "Listing already inactive");

        listing.active = false;
        emit ListingCancelled(listingId);
    }

    /// @notice Burn items (permanent removal)
    function burnItem(uint256 itemId, uint256 amount) external {
        _burn(msg.sender, itemId, amount);
        emit ItemBurned(msg.sender, itemId, amount);
    }

    /// @notice Get item details
    function getItem(uint256 itemId) external view returns (Item memory) {
        require(itemId < nextItemId, "Item does not exist");
        return items[itemId];
    }

    /// @notice Get marketplace listing details
    function getListing(uint256 listingId) external view returns (MarketplaceListing memory) {
        require(listingId < nextListingId, "Listing does not exist");
        return listings[listingId];
    }

    /// @notice Deactivate item (seasonal rotation)
    function deactivateItem(uint256 itemId) external onlyOwner {
        require(itemId < nextItemId, "Item does not exist");
        items[itemId].active = false;
    }

    /// @notice Activate item
    function activateItem(uint256 itemId) external onlyOwner {
        require(itemId < nextItemId, "Item does not exist");
        items[itemId].active = true;
    }

    /// @notice Advance season (archival, new items available)
    function setSeason(uint8 newSeason) external onlyOwner {
        currentSeason = newSeason;
        emit SeasonChanged(newSeason);
    }

    /// @notice Update platform fee percentage
    function setPlatformFee(uint256 feePercent) external onlyOwner {
        require(feePercent <= 10, "Fee too high");
        platformFeePercent = feePercent;
    }

    /// @notice Withdraw platform fees
    function withdrawFees(uint256 amount) external onlyOwner {
        (bool success,) = owner().call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    /// @notice Update URI for metadata
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }
}
