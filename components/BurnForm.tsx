import { TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import TokenBalance from "./TokenBalance";

const LockBurnForm = ({ setForm, contractAddress }) => {
  const [amount, setAmount] = useState(0);
  const [network, setNetwork] = useState(4);
  const [isLock] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      alert("Please add a number");
      return;
    }

    setForm({ amount, network, isLock });

    setAmount(0);
    setNetwork(4);
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
        <Grid>
          <Button variant="outlined" sx={{ margin: 2 }} onClick={onSubmit}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LockBurnForm;
