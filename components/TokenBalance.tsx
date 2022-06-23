import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useBRGTokenContract from "../hooks/useBRGTokenContract";

type TokenBalanceProps = {
  tokenAddress: string;
  symbol: string;
};

const TokenBalance = ({ tokenAddress, symbol }: TokenBalanceProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const contract = useBRGTokenContract(tokenAddress);

  return (
    <p>
      {`Address Token`}: {contract.address}
    </p>
  );
};

export default TokenBalance;
