
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net"
  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42];

  export const RINKEBY_WRAPPER_ADDRESS = "0xb194017B7E737ef9AaD860660Be066378FaD8240";
  export const RINKEBY_TOKEN_ADDRESS = "0xe66C17ef261e9405c96230262951108D13EF1e94";