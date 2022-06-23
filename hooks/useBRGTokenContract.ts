import BRG_TOKEN from "../contracts/BridgeToken.json";
import type { BridgeToken as BRGToken } from "../contracts/types";
import useContract from "./useContract";

export default function useBRGTokenContract(tokenAddress?: string) {
  return useContract<BRGToken>(tokenAddress, BRG_TOKEN);
}
