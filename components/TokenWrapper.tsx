import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useBRGWrapperContract from "../hooks/useBRGWrapperContract";

type TokenBalanceProps = {
  wrapperAddress: string;
  symbol: string;
};

const TokenWrapper = ({ wrapperAddress, symbol }: TokenBalanceProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const contract = useBRGWrapperContract(wrapperAddress);

  return (
    <p>
      {`Address Wrapper`}: {contract.address}
    </p>
  );
};

export default TokenWrapper;
