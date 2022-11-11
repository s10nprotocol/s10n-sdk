export const subManagerAbi = [
  'function getMerchantSubscriptionTotal(uint256 merchantTokenId) external view returns (uint256)',
  'function getMerchantPlanSubscriptionTotal(uint256 merchantTokenId, uint256 planIndex) external view returns (uint256)',
  'function createMerchant(string memory name, bool isSBT) external returns (uint256)',
  'function updateMerchant(uint256 merchantTokenId,string memory name) external',
  'function createPlan(uint256[] memory uints, address[] memory addresses, string[] memory strings) external',
  'function updatePlan(uint256 merchantTokenId, uint256 planIndex, string memory name, string memory description, address payeeAddress) external',
  'function createSubscription(uint256 merchantTokenId, uint256 planIndex) external',
  'function charge(uint256 subscriptionTokenId) external',
  'function cancelSubscription(uint256 subscriptionTokenId) external',
  'function enablePlan(uint256 merchantTokenId, uint256 planIndex) external',
  'function disablePlan(uint256 merchantTokenId, uint256 planIndex) external',
  'function merchantTokenManager() view returns (address)',
  'function planManager() view returns (address)',
  'function subTokenManager() view returns (address)',
  'function subInfoManager() view returns (address)',
];

export const merchantTokenManagerAbi = [
  'function ownerOf(uint256 tokenId) view returns (address)',
];

export const planManagerAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'merchantTokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'planIndex', type: 'uint256' },
    ],
    name: 'getPlan',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'merchantTokenId', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' },
          {
            internalType: 'enum Period.PeriodType',
            name: 'billingPeriod',
            type: 'uint8',
          },
          { internalType: 'address', name: 'paymentToken', type: 'address' },
          { internalType: 'address', name: 'payeeAddress', type: 'address' },
          {
            internalType: 'uint256',
            name: 'pricePerBillingPeriod',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'maxTermLength', type: 'uint256' },
          { internalType: 'bool', name: 'enabled', type: 'bool' },
          { internalType: 'bool', name: 'isSBT', type: 'bool' },
          { internalType: 'bool', name: 'canResubscribe', type: 'bool' },
        ],
        internalType: 'struct IPlanManager.Plan',
        name: 'plan',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const subTokenManagerAbi = [
  'function tokenURI(uint256 tokenId) view returns (string)',
];

export const subInfoManagerAbi = [
  'function getSubInfo(uint256 tokenId) view returns (uint256,uint256,uint256,uint256,uint256,uint256,bool)',
];
