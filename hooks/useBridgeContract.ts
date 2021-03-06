import BRIDGE_ABI from "../contracts/Bridge.json";
import type { Bridge } from "../contracts/types";
import useContract from "./useContract";

export default function useBridgeContract(contractAddress: string) {
  return useContract<Bridge>(contractAddress, BRIDGE_ABI);
}
