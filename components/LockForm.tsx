import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { nativeChainId, targetChainBSC, targetChainKov } from "../constants";
import TokenBalance from "./TokenBalance";

const LockForm = ({ setForm, contractAddress }) => {
  const [amount, setAmount] = useState(0);
  const [network, setNetwork] = useState(targetChainBSC);
  const [networkName, setNetworkName] = useState("BNB");
  const [isLock] = useState(true);

  const options = [
    { label: "BNB", value: targetChainBSC },
    { label: "Kovan", value: targetChainKov },
  ];

  const onSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Please add a number");
      return;
    }

    setForm({ amount, network, isLock });

    setAmount(0);
    setNetwork(nativeChainId);
  };

  return (
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
          <TokenBalance contractAddress={contractAddress} />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-amount"
            label="Amount"
            value={amount}
            type="number"
            sx={{ width: 300 }}
            onChange={(e) => setAmount(Number(e.target.value))}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <Autocomplete
            disablePortal
            id="combo-box-net"
            options={options}
            value={networkName}
            sx={{ width: 300 }}
            onChange={(event: any, newValue: any) => {
              setNetwork(Number(newValue.value));
              setNetworkName(newValue.label);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Target Network" />
            )}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" sx={{ margin: 2 }} onClick={onSubmit}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LockForm;
