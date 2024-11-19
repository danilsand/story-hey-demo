const handleStruct = [
  { internalType: 'uint256', name: 'id', type: 'uint256' },
  { internalType: 'address', name: 'collection', type: 'address' }
];

const tokenStruct = [
  { internalType: 'uint256', name: 'id', type: 'uint256' },
  { internalType: 'address', name: 'collection', type: 'address' }
];

const signatureStruct = [
  { internalType: 'address', name: 'signer', type: 'address' },
  { internalType: 'uint8', name: 'v', type: 'uint8' },
  { internalType: 'bytes32', name: 'r', type: 'bytes32' },
  { internalType: 'bytes32', name: 's', type: 'bytes32' },
  { internalType: 'uint256', name: 'deadline', type: 'uint256' }
];

export const TokenHandleRegistry = [
  {
    inputs: [
      { internalType: 'address', name: 'lensHub', type: 'address' },
      { internalType: 'address', name: 'lensHandles', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  ...[
    'DoesNotExist',
    'DoesNotHavePermissions',
    'HandleAndTokenNotInSameWallet',
    'NotHandleNorTokenOwner',
    'NotLinked',
    'OnlyLensHub',
    'SignatureExpired',
    'SignatureInvalid'
  ].map(name => ({
    inputs: [],
    name,
    type: 'error'
  })),
  ...[
    {
      name: 'HandleLinked',
      inputs: [
        { components: handleStruct, indexed: false, internalType: 'struct RegistryTypes.Handle', name: 'handle', type: 'tuple' },
        { components: tokenStruct, indexed: false, internalType: 'struct RegistryTypes.Token', name: 'token', type: 'tuple' },
        { indexed: false, internalType: 'address', name: 'transactionExecutor', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
      ],
    },
    {
      name: 'HandleUnlinked',
      inputs: [
        { components: handleStruct, indexed: false, internalType: 'struct RegistryTypes.Handle', name: 'handle', type: 'tuple' },
        { components: tokenStruct, indexed: false, internalType: 'struct RegistryTypes.Token', name: 'token', type: 'tuple' },
        { indexed: false, internalType: 'address', name: 'transactionExecutor', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
      ],
    },
    {
      name: 'NonceUpdated',
      inputs: [
        { indexed: true, internalType: 'address', name: 'signer', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'nonce', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
      ],
    }
  ].map(event => ({
    anonymous: false,
    ...event,
    type: 'event'
  })),
  ...[
    {
      name: 'getDefaultHandle',
      inputs: [{ internalType: 'uint256', name: 'profileId', type: 'uint256' }],
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      name: 'incrementNonce',
      inputs: [{ internalType: 'uint8', name: 'increment', type: 'uint8' }],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      name: 'link',
      inputs: [
        { internalType: 'uint256', name: 'handleId', type: 'uint256' },
        { internalType: 'uint256', name: 'profileId', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      name: 'linkWithSig',
      inputs: [
        { internalType: 'uint256', name: 'handleId', type: 'uint256' },
        { internalType: 'uint256', name: 'profileId', type: 'uint256' },
        { internalType: 'struct Types.EIP712Signature', name: 'signature', type: 'tuple', components: signatureStruct }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      name: 'migrationLink',
      inputs: [
        { internalType: 'uint256', name: 'handleId', type: 'uint256' },
        { internalType: 'uint256', name: 'profileId', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      name: 'nonces',
      inputs: [{ internalType: 'address', name: 'signer', type: 'address' }],
      outputs: [{ internalType: 'uint256', name: 'nonce', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      name: 'resolve',
      inputs: [{ internalType: 'uint256', name: 'handleId', type: 'uint256' }],
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      name: 'unlink',
      inputs: [
        { internalType: 'uint256', name: 'handleId', type: 'uint256' },
        { internalType: 'uint256', name: 'profileId', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      name: 'unlinkWithSig',
      inputs: [
        { internalType: 'uint256', name: 'handleId', type: 'uint256' },
        { internalType: 'uint256', name: 'profileId', type: 'uint256' },
        { internalType: 'struct Types.EIP712Signature', name: 'signature', type: 'tuple', components: signatureStruct }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
];
