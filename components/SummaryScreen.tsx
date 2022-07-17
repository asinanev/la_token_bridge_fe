import { Button, Grid } from "@mui/material";
import { ethers } from "ethers";
import useTokenContract from "../hooks/useTokenContract";

const SummaryScreen = ({
  form,
  nativeContractAddress,
  targetContractAddress,
  onExecute,
}) => {
  const nativeTokenContract = useTokenContract(nativeContractAddress);
  const targetTokenContract = useTokenContract(
    ethers.utils.isAddress(targetContractAddress)
      ? targetContractAddress
      : nativeContractAddress
  );

  let networkName = "";

  switch (form.network) {
    case 97:
      networkName = "BNB Testnet";
      break;
    case 42:
      networkName = "Kovan Testnet";
      break;
    case 4:
      networkName = "Rinkeby Testnet";
      break;
  }

  return (
    <>
      <Grid
        container
        wrap="nowrap"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ padding: 3 }}
      >
        <Grid item>Tokens to be bridged: {form.amount}</Grid>
        <Grid item>Bridging to: {networkName}</Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() =>
              onExecute(
                form,
                nativeTokenContract,
                nativeContractAddress !== targetContractAddress
                  ? targetTokenContract
                  : null
              )
            }
          >
            Transfer
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SummaryScreen;
