export const subManagerAbi = [
  'function getMerchantSubscriptionTotal(uint256 merchantTokenId) external view returns (uint256)',
  'function getMerchantPlanSubscriptionTotal(uint256 merchantTokenId, uint256 planIndex) external view returns (uint256)',
  'function createMerchant(string memory name, bool isSBT) external returns (uint256)',
  'function updateMerchant(uint256 merchantTokenId,string memory name) external',
  'function createPlan(uint256[] memory uints, address[] memory addresses, string[] memory strings) external',
  'function createSubscription(uint256 merchantTokenId, uint256 planIndex) external',
  'function charge(uint256 subscriptionTokenId) external',
  'function cancelSubscription(uint256 subscriptionTokenId) external',
  'function enablePlan(uint256 merchantTokenId, uint256 planIndex) external',
  'function disablePlan(uint256 merchantTokenId, uint256 planIndex) external',
  'function merchantTokenManager() view returns (address)',
  'function planManager() view returns (address)',
  'function subscriptionTokenManager() view returns (address)',
  'function subInfoManager() view returns (address)',
];

export const subTokenManagerAbi = [
  'function tokenURI(uint256 tokenId) view returns (string)',
];

export const subInfoManagerAbi = [
  'function getSubInfo(uint256 tokenId) view returns (uint256,uint256,uint256,uint256,uint256,uint256,bool)',
];
