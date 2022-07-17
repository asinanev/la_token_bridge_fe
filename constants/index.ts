export interface Networks {
  [key: number]: string;
}
export const walletConnectSupportedNetworks: Networks = {
  // Add your network rpc URL here
  4: "https://rinkeby.infura.io/v3/",
  42: "https://kovan.infura.io/v3/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
};

// Network chain ids
export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 97];

export const nativeChainId = 4;
export const targetChainKov = 42;
export const targetChainBSC = 97;

export const BSC_BRIDGE = "0x5bBC88AcC09c60640032d71775354711dF18366E";
export const KOV_BRIDGE = "0x2Dc38Af698A9aB66eA2997731D91C439c491F648";
export const RINKEBY_BRIDGE = "0xc9eb6F3398F7b5d4D632dBE21C2b7701a1E4179D";

export const RINKEBY_TOKEN_ADDRESS =
  "0x2Dc38Af698A9aB66eA2997731D91C439c491F648";
