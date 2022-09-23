export const SupportChain = {
    Mumbai: 'Mumbai',
    Polygon: 'Polygon'
}

export const contractAddressMap = {
    Mumbai: {
        SubManager: '0x8b83b8f92b6B6ae970bD65c14FB853785938A4C1',
        MerchantToken: '0x10dC9ff0361Dc99265DefCF345AA6F11Ddefb330',
        PlanManager: '0xF94f5D0bDD40980A7139F7715E9BC639A358123C',
        SubInfoManager: '0x710F036A5eA6214a80f30FeE8b3B9e8e59d479E2',
    },
    Polygon: {
        SubManager: '0x8b83b8f92b6B6ae970bD65c14FB853785938A4C1',
        MerchantToken: '0x10dC9ff0361Dc99265DefCF345AA6F11Ddefb330',
        PlanManager: '0xF94f5D0bDD40980A7139F7715E9BC639A358123C',
        SubInfoManager: '0x710F036A5eA6214a80f30FeE8b3B9e8e59d479E2',
    }
}

export const subManagerAbi = [
    "function createMerchant(string memory name) external returns (uint256)",
    "function updateMerchant(uint256 merchantTokenId,string memory name) external",
    "function createPlan(uint256 merchantTokenId, string memory name, string memory description, uint8 billingPeriod, address paymentToken, address payeeAddress, uint256 pricePerBillingPeriod, bool isSBT, uint maxTermLength) external",
    "function createSubscription(uint256 merchantTokenId, uint256 planIndex) external",
    "function charge(uint256 subscriptionTokenId) external",
    'function cancelSubscription(uint256 subscriptionTokenId) external',
    'function disablePlan(uint256 merchantTokenId, uint256 planIndex) external',
]