import { Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

const SwitchNetwork = ({ form, onSwitch }) => {
  let network;

  switch (form.network) {
    case 4:
      network = "Rinkeby Testnet";
      break;
    case 97:
      network = "BNB Testnet";
      break;
    case 42:
      network = "Kovan Testnet";
      break;
  }

  const { chainId } = useWeb3React();

  if (chainId === form.network) {
    onSwitch();
  }

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <h1>Please switch to {network} in MetaMask</h1>
        <h1>with the account you wish to claim your tokens</h1>
      </Box>
    </>
  );
};

export default SwitchNetwork;
