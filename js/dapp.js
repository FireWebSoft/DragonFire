const fromEvent = rxjs.fromEvent
const mergeMap = rxjs.mergeMap
const map = rxjs.map
const merge = rxjs.merge
const timer = rxjs.timer

// const CONTRACT_ADDRESS  = '0x99D5F1710Df11eDbC6fF29458aA571BaD652d8b8';
// const DEFAULT_REFERRAL  = '0x92bFDF9e446abAa1F10691afE21aD906118425be';
// const NFTSTAKING_ADDRESS = '0xDE568A3809bf3Ad58eB897F1c3F5829d36270CdA';
// const NFTAIRDROPTOKEN_ADDRESS = '0x93671dCF6C599Ea48Ff4892f5792C3a7E5725F41';

const CONTRACT_ADDRESS  = '0x5E765091b006E9c471dda919A5cd683e974c6520';
const DEFAULT_REFERRAL  = '0x92bFDF9e446abAa1F10691afE21aD906118425be';
const NFTSTAKING_ADDRESS = '0x2d474508724B73C9d1B6c444E74b78CdD5289f3c';
const NFTAIRDROPTOKEN_ADDRESS = '0xABffF0A619B86bfc4Be76b229fAcd38442546C70';

const CURRENCY_DIGITS_AFTER_DOT = 4
var gasPrice = '10000000000'

const APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Approve'
const INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Invest'
const STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Stake'
const UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Unstake'
const SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Sell'
const CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Claim'
const CLAIMALL_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Claim All'

const WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Withdraw'

var ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "txType",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "trxAmount",
        "type": "uint256"
      }
    ],
    "name": "TokenOperation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "BUSDAmount",
        "type": "uint256"
      }
    ],
    "name": "BUSDToToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BUSD_DAILYPROFIT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ENABLE_AIRDROP",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_INVEST_AMOUNT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SELL_LIMIT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SET_BUSD_DAILYPROFIT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SET_ENABLE_AIRDROP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SET_MIN_INVEST_AMOUNT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SET_SELL_LIMIT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SET_TOKEN_DAILYPROFIT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOKEN_DAILYPROFIT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOKEN_DAILYPROFIT_FOR_NFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "extraData",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "availableSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimAirdrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimAirdropM",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimToken_M",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimToken_T",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAPY_M",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAPY_T",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAvailableAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBUSDBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractLaunchTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractTokenBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentDay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getCurrentUserBonAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTimeToNextDay",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenAvailableToSell",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenSoldToday",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserAirdropReqInv",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserBUSDBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserBUSDStaked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserBonAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserCountAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUserDownlineCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUserReferralBonus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUserReferralTotalBonus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUserReferralWithdrawn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserTimeToNextAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserTimeToUnstake",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserTokenBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserTokenStaked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserUnclaimedTokens_M",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getUserUnclaimedTokens_T",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "limitSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ownerManualAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ownerManualAirdropCheckpoint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "name": "sellToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sentAirdrop",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "stakeBUSD",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "name": "stakeToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "name": "tokenToBUSD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBUSDStaked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTokenStaked",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalUsers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unStakeToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "updateStakeTokenForNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawRef",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

var startD, startH, startM, startS, startDdb, startHdb, startMdb;
var BUSDPrice = 0;
var TokenPrice = 0;
var userBUSDStaked = 0;
var userReqAirdropInv = 0;
var soldToday = 0;
let checkAttempt = 0;
var account = null;
// var contractInt = null;

function toHexString(number){return '0x'+number.toString(16)}

function main () {
    $('#connect-btn').click(()=> walletChoosingObserver())
    anyProviderObserver();
    walletChoosingObserver();
    checkUserWallet();
}

function showWalletSelection () {
    $('#connect-btn').click()
}

async function onNoWalletsConnected () {
    const accountsChangedMerge = takeUntil(merge(accountChangedSubject, walletChangedSubject))
    fromEvent($('#investButton'), 'click').pipe(accountsChangedMerge).subscribe(showWalletSelection)
    fromEvent($('#withdrawButton'), 'click').pipe(accountsChangedMerge).subscribe(showWalletSelection)
}

// NOT WORKING CHAIN ID DETECTION, INVESTIGATE LATER
function checkUserWallet(){
    const wallet = window.localStorage.getItem("WALLET");
    console.log("checkUserWallet: " + wallet);
    if(wallet === "ethereum" && !isMetaMaskInstalled()){
        return;
    } else if (wallet === "ethereum" && isMetaMaskInstalled()) {
        window.ethereum.on("chainChanged", () => window.location.reload())
        //If it is installed we change our button text
        // onboardButton.appendChild(document.createElement("p").innerText = "Connect")
        checkUserChainId().then(res => res).catch(e => console.log(e))
        return;
    } else if (wallet === "BinanceChain" && !isBinanceChainWallet()){
      console.log("checkAttempt: " + checkAttempt);
        if(checkAttempt > 5) {
            return;
        }
        checkAttempt++
        setTimeout(checkUserWallet,800)// binance chain wallet take some time to load
    } else if (wallet === "BinanceChain" && isBinanceChainWallet() ){
        window.BinanceChain.on("chainChanged", () => window.location.reload())
        checkUserChainId().then(res => res).catch(e => console.log(e))
        return;
    } else {
        return;
    }
}

const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const isBinanceChainWallet = () => {
    const { BinanceChain } = window;
    return Boolean(BinanceChain);
}

async function checkUserChainId() {
    const wallet = window.localStorage.getItem("WALLET")
    if(wallet === "ethereum" && window.ethereum.chainId === null) {
        setTimeout(checkUserChainId, 800);
        return;
    }
    if(wallet === "ethereum" && window.ethereum.chainId && (Number.parseInt(window.ethereum.chainId) !== 56)){
        
        const res = confirm('Switch to mainnet, please.')
            if(res){
              try{
              await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x38' }],
                });
              } catch (switchError) {
               
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {

                   const res =  await window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: '0x38',
                          chainName: 'Binance SmartChain Mainnet',
                          nativeCurrency: {
                            name: 'Binance',
                            symbol: 'BNB',
                            decimals: 18
                          },
                          rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                          blockExplorerUrls: ['https://polygonscan.com/']
                        }
                      ],
                    });

                  } catch (addError) {
                    console.log(addError);
                  }
                }
                // handle other "switch" errors
              }
            }
    } else if(wallet === "BinanceChain" && window.BinanceChain.chainId && Number.parseInt(window.BinanceChain.chainId) !== 56){
        const params = [{
            chainId: '0x38',
            chainName: 'Binance SmartChain',
            nativeCurrency: {
              name: 'Binance',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/']

          }]
          const res = confirm(`Please switch network to ${params[0].chainName}.`)
          if(res) {
            BinanceChain.switchNetwork("bsc-mainnet")
          }
        }
}

function onAccountsChanged (currentAccount) {
    account = currentAccount;
    accountChangedSubject.next(1)
    $('#connect-btn').text(getShorterAddress(currentAccount))    
}

function getShorterAddress (address, tailsLength = 3) {
    return address.substring(0, tailsLength) + '...' + address.substring(address.length - tailsLength, address.length)
}

async function setGlobalStatisticsEvents (contract) {
  contractInt = contract;

  contract.getTimeToNextDay().then(res=>{
    var t = parseInt(res) + 60
    var tw = parseInt(res) + 60
    startD = parseInt(t / 60 / 60 / 24)
    var startDw = parseInt(tw / 60 / 60 / 12)
    t = t - startD * 60 * 60 * 24
    tw = tw - startDw * 60 * 60 * 12
    startH = parseInt(t / 60 / 60)
    var startHw = parseInt(tw / 60 / 60)
    t = t - startH * 60 * 60
    tw = tw - startHw * 60 * 60
    startM = parseInt(t / 60)
    var startMw = parseInt(tw / 60)
    t = t - startM * 60
    tw = tw - startMw * 60
    startS = parseInt(t)

    startDdb = startD
    startHdb = startH
    startMdb = startM
  
    $("#time-tonextday").html(`<span><b>${startD}D : ${startHw}H : ${startM}M</b></span>`)
  });
  contract.getTokenPrice().then(res=>{ 
    TokenPrice = formatCurrency(res).toFixed(6)
    $("#token-priceM").html(`<b>${TokenPrice}</b>`)
    $("#token-price").html(`<b>${TokenPrice}</b>`)
  });
  contract.totalSupply().then(res=>{
    $(".total-supply").html(`<b>${formatCurrency(res).toFixed(2)}</b>`)		
  });
  // contract.limitSupply().then(res=>{
  //   $("#limit-supply").html(`<b>${formatCurrency(res).toFixed(2)}</b>`)			
  // });
  contract.availableSupply().then(res=>{
    $(".available-supply").html(`<b>${formatCurrency(res).toFixed(2)}</b>`)				
  });
  contract.totalUsers().then(res=>{
    $("#total-users").text(res)			
  });
  contract.getAPY_M().then(res=>{                	
    $("#APY_M").html(`<span><b>${res}%</b></span>`)
  });
  contract.getAPY_T().then(res=>{                	
    $("#APY_T").html(`<span><b>${res}%</b></span>`)
  });
  contract.totalBUSDStaked().then(res=>{                	
    $("#total-BUSD-staked").html(`<span><b>${formatCurrency(res).toFixed(2)}</b></span>`)
  });
  contract.totalUsers().then(res=>{                	
    $("#totalUsers").html(`<h7><span><b>${(res)}</b></span></h7>`)
  });
  contract.totalTokenStaked().then(res=>{                	
    $("#total-token-staked").html(`<span><b>${formatCurrency(res).toFixed(2)}</b></span>`)
  });
  contract.getAvailableAirdrop().then(res=>{
    $("#available-airdrop").html(`<b>${formatCurrency(res).toFixed(0)}</b>`)
  });
  contract.getTokenSoldToday().then(res=>{    
    soldToday = formatCurrency(res).toFixed(2);
    $("#total-sold-today").html(`<span><b>${soldToday}</b></span>`)
  });
}

function setPersonalStatisticsEvents (provider, contract, tokenContract, currentAccount) {
  onAccountsChanged(currentAccount);

  const personalStatisticsSubscriber = {
      next: () => setPersonalStatistics(contract, currentAccount),
      complete: () => showWarningPopup('Transaction done', 'Transaction done', 5000)
  }

  contract.getUserTimeToUnstake(currentAccount).then(res => {
    var t = parseInt(res) + 60
    startD = parseInt(t / 60 / 60 / 24)

		t = t - startD * 60 * 60 * 24
		startH = parseInt(t / 60 / 60)
			
		t = t - startH * 60 * 60
		startM = parseInt(t / 60)
			
		t = t - startM * 60
		startS = parseInt(t)

    if (res == 0) {
      $("#time-tounstake").html(`<div class="col-12" id="time-tounstake"><p><span>Unstake available in: 0D : 0H : 0M</b></span></p></div>`)
    } else {
      $("#time-tounstake").html(`<div class="col-12" id="time-tounstake"><p><span>Unstake available in: ${startD}D : ${startH}H : ${startM}M</b></span></p></div>`)
    }
  });;

  contract.getUserTimeToNextAirdrop(currentAccount).then(res=>{
    var t = parseInt(res) + 60				
    startD = parseInt(t / 60 / 60 / 24)
    
    t = t - startD * 60 * 60 * 24
    startH = parseInt(t / 60 / 60)	
    
    t = t - startH * 60 * 60
    startM = parseInt(t / 60)	
    
    t = t - startM * 60
    startS = parseInt(t)				
    
    if (res == 0) {
      $("#airdrop-c-2").html(`7 days since the last claim<span><br>✅</span>`)
    } else {
      $("#airdrop-c-2").html(`7 days since the last claim<span><br>${startD}D : ${startH}H : ${startM}M❌</span>`)
    }
  });

  contract.getUserTokenBalance(currentAccount).then(res=>{
    $(".user-token-balance").html(`<b>${formatCurrency(res).toFixed(4)}</b>`)
  });

  contract.getUserBUSDStaked(currentAccount).then(res=>{	
    userBUSDStaked = formatCurrency(res).toFixed(2)
    $("#user-BUSD-staked").html(`<span><b><h7>${userBUSDStaked}</h7></b></span>`)
  });

  contract.getUserAirdropReqInv(currentAccount).then(res=>{	
    userReqAirdropInv = formatCurrency(res).toFixed(2)
    if (parseInt(userReqAirdropInv) > parseInt(userBUSDStaked)) {
      $("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>❌</span>`)						
    } else {
      $("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>✅</span>`)	
    }
  });

  contract.getUserBonAirdrop(currentAccount).then(res=>{                	
    if (res >= 5) {
      $("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})✅</span>`)	
    } else {
      $("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})❌</span>`)	
    }
  });

  contract.getUserTokenStaked(currentAccount).then(res=>{                	
    $("#user-token-staked").html(`<span><b>${formatCurrency(res).toFixed(2)} </b></span>`)
  });		
  
  contract.getUserUnclaimedTokens_M(currentAccount).then(res=>{		
    $("#user-unClaimed-M").html(`<b>${formatCurrency(res).toFixed(4)} </b>`)
  });
  
  contract.getUserUnclaimedTokens_T(currentAccount).then(res=>{
    $("#user-unClaimed-T").html(`<b>${formatCurrency(res).toFixed(4)} </b>`)	
  });

  contract.getUserReferralBonus(currentAccount).then(res=>{
    $("#referral-available").text(formatCurrency(res).toFixed(2))
  });         
  
  contract.getUserReferralTotalBonus(currentAccount).then(res=>{
    $("#referral-earned").text(formatCurrency(res).toFixed(2))
  });

  contract.getUserReferralWithdrawn(currentAccount).then(res=>{
    $("#referral-withdrawn").text(formatCurrency(res).toFixed(2))
  });

  contract.getUserDownlineCount(currentAccount).then(res=>{                
    var sum = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2])                
    $("#total-referrals").text(formatCurrency(sum).toFixed(0))
  });

  tokenContract.balanceOf(currentAccount).then(res => {
    $("#user-BUSD-balance-1").html(`<b>${formatCurrency(res).toFixed(4)}</b>`)
  });

  $("#ref-link").val('https://' + window.location.host  + '/?ref=' + currentAccount)
}

async function requestAccounts (provider) {
  if(provider.accounts) return provider.accounts
  let ret = await provider.request({ method: 'eth_requestAccounts' })
  console.log(ret)
  return ret
}

// SET MAX

const SetMaxBUSDApprove = () => {
	var inputF = document.getElementById("input-approve");
	tokenContract.balanceOf(account).then(res => {
		inputF.value = `${formatCurrency(res).toFixed(4)}`;
	})
}

const SetMaxBUSD = () => {
	var inputF = document.getElementById("input-busd");
	tokenContract.balanceOf(account).then(res => {
		inputF.value = `${formatCurrency(res).toFixed(4)}`;
	})
}

function SetMaxBUSDToken() {
	var inputF = document.getElementById("input-2");
	contractInt.getUserTokenBalance(account).then(res=>{
		
		amt = ethers.utils.formatEther(res);	
		inputF.value = parseFloat(amt).toFixed(3);// - 0.001;
	})	
}

function SetMaxBUSDTokenToSell() {
	var inputF = document.getElementById("input-3");
	contractInt.getUserTokenBalance(account).then(res=>{
		
		amt = ethers.utils.formatEther(res);	
		inputF.value = parseFloat(amt).toFixed(3);// - 0.001;
	})	
}


function formatCurrency (value) {
    return floorToSmaller(Number.parseFloat(ethers.utils.formatEther(value)))
}

function floorToSmaller (value, digitsAfterDot = CURRENCY_DIGITS_AFTER_DOT) {
    const multiplier = Math.pow(10, digitsAfterDot)
    return Math.floor(value * multiplier) / multiplier
}

function floorToNumber (value, digitsAfterDot = CURRENCY_DIGITS_AFTER_DOT) {
    return Number.parseFloat(value.toFixed(digitsAfterDot))
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).val()).select();
  document.execCommand("copy");
  const copiedSuccessfully = $('#copiedSuccessfully')
  copiedSuccessfully.show()
  setTimeout(function(){
    copiedSuccessfully.hide()
  },3000);
  $temp.remove();
}

function transactionObservableFactory (tx) {
  return new Observable(subscriber => {
      tx.wait().then(() => {
          subscriber.next()
          subscriber.complete()
      })
  })
}

// TOKEN
function approveBUSD() {
  const approveButton = $('#approveButton');
  var trxspenddoc = document.getElementById('input-approve')
  const buttonStateObserver = {
    next: () => approveButton.empty().append(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => approveButton.text(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  if(tokenContract){
    approveButton.empty().append(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
    tokenContract.approve(CONTRACT_ADDRESS, ethers.utils.parseEther(trxspenddoc.value), { from: account }).then(tx => {
      const transactionObservable = transactionObservableFactory(tx);
      transactionObservable.subscribe(buttonStateObserver);
    }).catch((e) => approveButton.text(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
  }
}

function stakeM() {
// 	var today = new Date();
// 	var date = today.getUTCFullYear() + '-' + (today.getUTCMonth() + 1) + '-' + today.getUTCDate();
// 	var time = today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();
// 	var CurrentDateTime = date + ' ' + time;
// 
// 	var busdlaunch = new Date("Sat Dec 18 2021 13:00:00 GMT-0000");
	// var date = busdlaunch.getUTCFullYear() + '-' + (busdlaunch.getUTCMonth() + 1) + '-' + busdlaunch.getUTCDate();
	// var time = busdlaunch.getUTCHours() + ":" + busdlaunch.getUTCMinutes() + ":" + busdlaunch.getUTCSeconds();
	// var BUSDLaunchDateTime = date + ' ' + time;
	const investButton = $('#investButton');
	const buttonStateObserver = {
    next: () => investButton.empty().append(INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => investButton.text(INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }

	// if (CurrentDateTime > BUSDLaunchDateTime) {	// launched
		if (contractInt) {
      var trxspenddoc = document.getElementById('input-busd')
      console.log("stake busd: " + trxspenddoc.value)
      investButton.empty().append(INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
      contractInt.stakeBUSD(DEFAULT_REFERRAL, ethers.utils.parseEther(trxspenddoc.value), {from: account}).then(tx => {
        const transactionObservable = transactionObservableFactory(tx)
        transactionObservable.subscribe(buttonStateObserver)
      }).catch((e) => investButton.text(INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE));
		}
	// } else {
	// 	window.alert("Staking BUSD available from : Sat Dec 18 2021 13:00:00 GMT-0000");
	// }
}

function stakeT(input) {
	const stakeButton = $('#stakeButton');
	const buttonStateObserver = {
        next: () => stakeButton.empty().append(STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => stakeButton.text(STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
	if (contractInt) {
		var amount = ethers.utils.parseEther($(input).val())//toHexString($(input).val() * 1e18)
		console.log(amount)
		stakeButton.empty().append(STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
		contractInt.stakeToken(amount).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
      
		}).catch(() => stakeButton.text(STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
	}
}

function sell(input) {
	const sellButton = $('#sellButton');
	const buttonStateObserver = {
      next: () => sellButton.empty().append(SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
      complete: () => sellButton.text(SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
	if (contractInt) {
    var amount = toHexString($(input).val() * 1e18)
		console.log(amount)
		sellButton.empty().append(SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING);
		contractInt.sellToken(amount, {
			// value: 0,
			from: account,
			gasPrice: gasPrice,
		}).then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => sellButton.text(SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE))
	}
}

$("#claimMButton").click(()=>{
	const claimMButton = $('#claimMButton');
	const buttonStateObserver = {
    next: () => claimMButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => claimMButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  if(contractInt){
    claimMButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
    contractInt.claimToken_M({
      value: 0,
      from: account,
      gasPrice: gasPrice,
    }).then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
      transactionObservable.subscribe(buttonStateObserver)
    }).catch(() => claimMButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE))
  }
})

$("#claimTButton").click(()=>{
	const claimTButton = $('#claimTButton');
	const buttonStateObserver = {
      next: () => claimTButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
      complete: () => claimTButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  if(contractInt){
    claimTButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
    contractInt.claimToken_T({
      from: account,
      gasPrice: gasPrice,
    }).then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
      transactionObservable.subscribe(buttonStateObserver)
    }).catch(() => 
      claimTButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    )
  }
})

$("#claimAButton").click(()=>{
	const claimAButton = $('#claimAButton');
	const buttonStateObserver = {
        next: () => claimAButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
        complete: () => claimAButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    }
  if(contractInt){
		claimAButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contractInt.claimAirdrop({
            value: 0,
            from: account,
            gasPrice: gasPrice,
        }).then(tx => {
			const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => claimAButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE))
  }
})

$("#unstakeButton").click(()=>{
	const unstakeButton = $('#unstakeButton');
	const buttonStateObserver = {
    next: () => unstakeButton.empty().append(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => unstakeButton.text(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  } 
  if(contractInt){
    unstakeButton.empty().append(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
    contractInt.unStakeToken().then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
      transactionObservable.subscribe(buttonStateObserver)
    }).catch((e) =>{
      console.log(e)
      unstakeButton.text(UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
    })
  }
})

$("#withdraw-referral-btn").click(()=>{
	const withdrawReferralBtn = $('#withdraw-referral-btn');
	const buttonStateObserver = {
    next: () => withdrawReferralBtn.empty().append(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => withdrawReferralBtn.text(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  if(contractInt){
    withdrawReferralBtn.empty().append(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
        contractInt.withdrawRef({
            value: 0,
            from: account,
            gasPrice: gasPrice ,
        }).then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
      transactionObservable.subscribe(buttonStateObserver)
    }).catch(() => withdrawReferralBtn.text(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE))
  }
})

$("#input-3").on('input',()=>{
  var amount = $("#input-3").val();

  if(contractInt){
    var profit = (amount * TokenPrice)
    $("#sell-calc").html(`<b>${profit.toFixed(2)}</b>`)
  }
})

// NFT

$("#mintButton").click(function(){
  tokenNFTAirDrop.mint("https://abc.com/3", account, ethers.utils.parseEther('0.001')).then(res=>{ 
    console.log(res.value);
    //tokenNFTAirDrop.approve(account, res);
  });
  tokenNFTAirDrop.mint("https://abc.com/4", account, ethers.utils.parseEther('0.001')).then(res=>{ 
    console.log(res.value);
    //tokenNFTAirDrop.approve(account, res);
  });
})

$("#approveAllButton").click(function(){
  const approveAllButton = $('#approveAllButton');
  const buttonStateObserver = {
    next: () => approveAllButton.empty().append(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => approveAllButton.text(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  approveAllButton.empty().append(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
  tokenNFTAirDrop.setApprovalForAll(NFTSTAKING_ADDRESS, true).then(tx =>{
    const transactionObservable = transactionObservableFactory(tx)
		transactionObservable.subscribe(buttonStateObserver)
  }).catch(() => approveAllButton.text(APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
})

$("#claimAllButton").click(function(){
  const claimAllButton = $('#claimAllButton');
  const buttonStateObserver = {
      next: () => claimAllButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
      complete: () => claimAllButton.text(CLAIMALL_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  claimAllButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
  contractNFTStaking.claimAllOfAccount().then(tx =>{
    const transactionObservable = transactionObservableFactory(tx)
		transactionObservable.subscribe(buttonStateObserver)
  }).catch(() => claimAllButton.text(CLAIMALL_BUTTON_CONTENT_ON_TRANSACTION_DONE))
})

function stakeNFT(input) {
  const stakeNFTButton = $('#stakeNFTButton');
	const buttonStateObserver = {
      next: () => stakeNFTButton.empty().append(STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
      complete: () => stakeNFTButton.text(STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
	if (contractNFTStaking) {
		var amount = $(input).val().split(",")
		console.log("Amount: " + amount);
		stakeNFTButton.empty().append(STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
		contractNFTStaking.addManyToRegistery(account, amount).then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
			transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => stakeNFTButton.text(STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE))
	}
}

function claimNFT(input) {
  const claimNFTButton = $(input);
	const buttonStateObserver = {
    next: () => claimNFTButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
    complete: () => claimNFTButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE)
  }
  if(contractNFTStaking){
    var amount = $(input).val().split(",")
		claimNFTButton.empty().append(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
    contractNFTStaking.claimManyFromRegistery(amount, true, {
        value: 0,
        from: account,
        gasPrice: gasPrice,
    }).then(tx => {
      const transactionObservable = transactionObservableFactory(tx)
      transactionObservable.subscribe(buttonStateObserver)
		}).catch(() => claimNFTButton.text(CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE))
  }
}

$(document).ready(main)
	
setInterval(() => {
	if(contractInt && tokenContract && contractNFTStaking){

    // Short Address
		var connectedAddr = account[0] + 
							account[1] + 
							account[2] + 
							account[3] + 
							account[4] + '...' +
							account[account.length-5] + 
							account[account.length-4] + 
							account[account.length-3] + 
							account[account.length-2] + 
							account[account.length-1]

		$("#connect-btn").text(connectedAddr)

    contractInt.getContractLaunchTime().then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)		
		})
		
		contractInt.getTimeToNextDay().then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)				
		
			$("#time-tonextday").html(`<span><b>${startD}D : ${startH}H : ${startM}M</b></span>`)	
		})
		
		contractInt.getUserTimeToUnstake(account).then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)

      if (res == 0) {
        $("#time-tounstake").html(`<div class="col-12" id="time-tounstake"><p><span>Unstake available in: 0D : 0H : 0M</b></span></p></div>`)
			} else {
        $("#time-tounstake").html(`<div class="col-12" id="time-tounstake"><p><span>Unstake available in: ${startD}D : ${startH}H : ${startM}M</b></span></p></div>`)
			}
		})
		
		contractInt.getUserTimeToNextAirdrop(account).then(res=>{                		
			var t = parseInt(res) + 60				
			startD = parseInt(t / 60 / 60 / 24)
			
			t = t - startD * 60 * 60 * 24
			startH = parseInt(t / 60 / 60)	
			
			t = t - startH * 60 * 60
			startM = parseInt(t / 60)	
			
			t = t - startM * 60
			startS = parseInt(t)				
			
			if (res == 0) {
				$("#airdrop-c-2").html(`7 days since the last claim<span><br>✅</span>`)
			} else {
				$("#airdrop-c-2").html(`7 days since the last claim<span><br>${startD}D : ${startH}H : ${startM}M❌</span>`)														   
			}
		})

		contractInt.getTokenPrice().then(res=>{ 
			TokenPrice = (res/1e18).toFixed(6)
			$("#token-priceM").html(`<b>${TokenPrice}</b>`)
			$("#token-price").html(`<b>${TokenPrice}</b>`)
		})	
		
		contractInt.totalSupply().then(res=>{
			$("#total-supply").html(`<b>${(res/1e18).toFixed(2)}</b>`)		
		})	
		
		// contractInt.limitSupply().then(res=>{
		// 	$("#limit-supply").html(`<b>${(res/1e18).toFixed(2)}</b>`)
		// })	
		
		contractInt.availableSupply().then(res=>{
			$("#available-supply").html(`<b>${(res/1e18).toFixed(2)}</b>`)				
		})	
		
		contractInt.totalUsers().then(res=>{
			$("#total-users").text(res)			
		})	
		
		contractInt.getAPY_M().then(res=>{                	
			$("#APY_M").html(`<span><b>${res}%</b></span>`)
		})	
		
		contractInt.getAPY_T().then(res=>{                	
			$("#APY_T").html(`<span><b>${res}%</b></span>`)
		})				
		
		contractInt.totalBUSDStaked().then(res=>{                	
			$("#total-BUSD-staked").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		})	

		contractInt.totalUsers().then(res=>{                	
			$("#totalUsers").html(`<h7><span><b>${(res)}</b></span></h7>`)
		})				
		
		contractInt.totalTokenStaked().then(res=>{                	
			$("#total-token-staked").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		})
    
    contractInt.getContractTokenBalance().then(res=>{
			$("#contract-token-balance").text((res/1e18).toFixed(2))
		})
		
		contractInt.getAvailableAirdrop().then(res=>{
			$("#available-airdrop").html(`<b>${(res/1e18).toFixed(0)}</b>`)
		})	
		
		contractInt.getUserTokenBalance(account).then(res=>{
			$(".user-token-balance").html(`<b>${(res/1e18).toFixed(4)}</b>`)
		})
		
		contractInt.getUserBUSDStaked(account).then(res=>{	
			userBUSDStaked = (res/1e18).toFixed(2)
			$("#user-BUSD-staked").html(`<span><b><h7>${userBUSDStaked}</h7></b></span>`)
		})
		
		contractInt.getUserAirdropReqInv(account).then(res=>{	
			userReqAirdropInv = (res/1e18).toFixed(2)
			if ( parseInt(userReqAirdropInv) > parseInt(userBUSDStaked)) {
				$("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>❌</span>`)						
			} else {
				$("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>✅</span>`)	
			}
		})				
		
		contractInt.getUserBonAirdrop(account).then(res=>{                	
			if (res >= 5) {
				$("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})✅</span>`)	
			} else {
				$("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})❌</span>`)	
			}
		})			
		
		contractInt.getUserTokenStaked(account).then(res=>{                	
			$("#user-token-staked").html(`<span><b>${(res/1e18).toFixed(2)} </b></span>`)
		})				
		
		contractInt.getUserUnclaimedTokens_M(account).then(res=>{		
			$("#user-unClaimed-M").html(`<b>${(res/1e18).toFixed(4)} </b>`)
		})				
		
		contractInt.getUserUnclaimedTokens_T(account).then(res=>{
			$("#user-unClaimed-T").html(`<b>${(res/1e18).toFixed(4)} </b>`)	
		})
		
		contractInt.getTokenSoldToday().then(res=>{                	
			$("#total-sold-today").html(`<span><b>${(res/1e18).toFixed(2)}</b></span>`)
		})

    contractInt.getUserReferralBonus(account).then(res=>{
			$("#referral-available").text((res/1e18).toFixed(2))
		})           
		
		contractInt.getUserReferralTotalBonus(account).then(res=>{
			$("#referral-earned").text((res/1e18).toFixed(2))
		})

		contractInt.getUserReferralWithdrawn(account).then(res=>{
			$("#referral-withdrawn").text((res/1e18).toFixed(2))
		})

		contractInt.getUserDownlineCount(account).then(res=>{                
			var sum = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2])                
			$("#total-referrals").text(sum.toFixed(0))
		})
		
		tokenContract.balanceOf(CONTRACT_ADDRESS).then(res => {	
			$("#contract-BUSD-balance").text((res/1e18).toFixed(2))
		})

		tokenContract.balanceOf(account).then(res => {
			$("#user-BUSD-balance-1").html(`<b>${(res/1e18).toFixed(4)}</b>`)
		})

    contractNFTStaking.totalStaked().then(tx =>{
      $("#total-nft-staked").html(parseInt(tx));
    }).catch((e) => console.log(e))
		
		contractNFTStaking.getStakeInfoOfAccount(account).then(tx =>{
      var allStackNFTs = [];
      for (var i = 0; i < tx.length; i++){
        allStackNFTs.push(parseInt(tx[i]));
      }
      $("#user-nft-staked").html(allStackNFTs.length);
      if(allStackNFTs.length > 0){
        $("#myStakingNFT").html(`<b>${allStackNFTs.join(",")}</b>`);
      }
    }).catch((e) => console.log(e))

		$("#ref-link").val('https://' + window.location.host  + '/?ref=' + account)
	}
}, 3000);
