import BRG_WRAPPER from "../contracts/BridgeWrapper.json";
import type { BridgeWrapper as BRGWrapper } from "../contracts/types";
import useContract from "./useContract";

export default function useBRGWrapperContract(contractAddress?: string) {
  return useContract<BRGWrapper>(contractAddress, BRG_WRAPPER);
}
