import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";

const TokenBalance = ({ contractAddress }) => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useTokenBalance(account, contractAddress);

  return <p>Balance: WTKN{parseBalance(data ?? 0)}</p>;
};

export default TokenBalance;
