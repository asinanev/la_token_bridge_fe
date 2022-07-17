import type { Web3Provider } from "@ethersproject/providers";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { nativeChainId, targetChainBSC, targetChainKov } from "../constants";

const ClaimReleaseForm = ({ form, executeClaimRelease }) => {
  const { chainId } = useWeb3React<Web3Provider>();

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!tokenName) {
      alert("Please add a token name");
      return;
    }

    if (!tokenSymbol) {
      alert("Please add a token symbol");
      return;
    }

    let newToken = { tokenName, tokenSymbol };

    setTokenName("");
    setTokenSymbol("");

    executeClaimRelease(form, newToken);
  };

  let network;
  let mode;

  switch (chainId) {
    case nativeChainId:
      mode = "released";
      network = "Rinkeby Testnet";
      break;
    case targetChainKov:
      mode = "claimed";
      network = "Kovan Testnet";
      break;
    case targetChainBSC:
      mode = "claimed";
      network = "BNB Testnet";
      break;
  }

  return (
    <>
      {chainId !== nativeChainId && (
        <>
          <Grid
            container
            wrap="nowrap"
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                id="outlined-token-name"
                label="Token Name"
                value={tokenName}
                sx={{ width: 300 }}
                onChange={(e) => setTokenName(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-token-smbl"
                label="Token Symbol"
                value={tokenSymbol}
                sx={{ width: 300 }}
                onChange={(e) => setTokenSymbol(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid>
              <Button variant="outlined" sx={{ margin: 2 }} onClick={onSubmit}>
                Transfer
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {chainId === nativeChainId && (
        <>
          <Box sx={{ padding: 3 }}>
            <p>
              {form.amount} tokens are ready to be {mode} in the {network}
            </p>
            <Button
              sx={{ margin: 2 }}
              variant="outlined"
              onClick={async () => {
                executeClaimRelease(form);
              }}
            >
              Transfer
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ClaimReleaseForm;
