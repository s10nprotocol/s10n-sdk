export const SupportChain = {
  Mumbai: 'Mumbai',
  Polygon: 'Polygon',
};

export const contractAddressMap = {
  Mumbai: {
    SubManager: '0x3fac0A1dE155A2B7d41DFC639DaF006e6030d705',
    MerchantToken: '0x8F95A0bE8B571Ed428e2A36953808926450c8569',
    PlanManager: '0x7cAd7d83E9c8Fb68D4e0D92841a1B6766C104652',
    SubInfoManager: '0x93dFcd4cb74b636C37aC6045D9d30C4F6B080da0',
    SubTokenManager: '0xEf7460Ca4c483887A5FdAD9C85EF84b4A2B5915f',
  },
  Polygon: {
    SubManager: '0x3fac0A1dE155A2B7d41DFC639DaF006e6030d705',
    MerchantToken: '0x10dC9ff0361Dc99265DefCF345AA6F11Ddefb330',
    PlanManager: '0xF94f5D0bDD40980A7139F7715E9BC639A358123C',
    SubInfoManager: '0x710F036A5eA6214a80f30FeE8b3B9e8e59d479E2',
  },
};

export const subManagerAbi = [
  'function getMerchantSubscriptionTotal(uint256 merchantTokenId) external view returns (uint256)',
  'function getMerchantPlanSubscriptionTotal(uint256 merchantTokenId, uint256 planIndex) external view returns (uint256)',
  'function createMerchant(string memory name) external returns (uint256)',
  'function updateMerchant(uint256 merchantTokenId,string memory name) external',
  'function createPlan(uint256[] memory uints, address[] memory addresses, string[] memory strings) external',
  'function createSubscription(uint256 merchantTokenId, uint256 planIndex) external',
  'function charge(uint256 subscriptionTokenId) external',
  'function cancelSubscription(uint256 subscriptionTokenId) external',
  'function disablePlan(uint256 merchantTokenId, uint256 planIndex) external',
  'function planManager() view returns (address)',
  'function subTokenManager() view returns (address)',
  'function subInfoManager() view returns (address)',
];

export const subTokenManagerAbi = [
  'function tokenURI(uint256 tokenId) view returns (string)',
];

export const subInfoManagerAbi = [
    'function getSubInfo(uint256 tokenId) view returns (uint256,uint256,uint256,uint256,uint256,bool)'
]
