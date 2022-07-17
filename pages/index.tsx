import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import Head from "next/head";
import { useState } from "react";
import Account from "../components/Account";
import BurnForm from "../components/BurnForm";
import ClaimReleaseForm from "../components/ClaimReleaseForm";
import LockForm from "../components/LockForm";
import SummaryScreen from "../components/SummaryScreen";
import SwitchNetwork from "../components/SwitchNetwork";
import {
  BSC_BRIDGE,
  KOV_BRIDGE,
  nativeChainId,
  RINKEBY_BRIDGE,
  targetChainBSC,
} from "../constants";
import { Bridge, ERC20 } from "../contracts/types";
import useBridgeContract from "../hooks/useBridgeContract";
import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import BRIDGE_ABI from "../contracts/Bridge.json";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Paper,
  TextField,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Home() {
  const [showScreen, setShowScreen] = useState(0);
  const [form, setForm] = useState({});
  const [nativeContractAddress, setNatContractAddress] = useState("");
  const [targetContractAddress, setTgtContractAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { account, library, chainId } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === "string" && !!library;

  const nativeBridge = useContract<Bridge>(RINKEBY_BRIDGE, BRIDGE_ABI);
  const targetBridge = useBridgeContract(
    chainId === targetChainBSC ? BSC_BRIDGE : KOV_BRIDGE
  );

  const reviewLockBurnForm = async (data) => {
    if (!data.isLock) {
      let address = await targetBridge.getCorrespondingContract(
        nativeContractAddress
      );
      setTgtContractAddress(address);
    }

    setForm(data);
    setShowScreen(2);
  };

  const executeLockBurn = async (
    data,
    nativeTokenContract: ERC20,
    targetTokenContract?: ERC20
  ) => {
    setLoading(true);
    if (data.isLock === true) {
      let approveTx = await nativeTokenContract.approve(
        nativeBridge.address,
        ethers.utils.parseEther(data.amount.toString()),
        { from: account }
      );
      approveTx.wait();

      let lockTx = await nativeBridge.lock(
        nativeContractAddress,
        ethers.utils.parseEther(data.amount.toString()),
        { value: BigNumber.from(2000000) }
      );
      lockTx.wait();
    } else if (!!targetTokenContract) {
      let approveTx = await targetTokenContract.approve(
        targetBridge.address,
        ethers.utils.parseEther(data.amount.toString())
      );
      approveTx.wait();

      let burnTx = await targetBridge.burn(
        nativeContractAddress,
        ethers.utils.parseEther(data.amount.toString())
      );
      burnTx.wait();
    }
  };

  const onSwitch = () => {
    setShowScreen(4);
  };

  const executeClaimRelease = async (data, newToken) => {
    setLoading(true);
    if (chainId === nativeChainId) {
      let releaseTx = await nativeBridge.release(
        nativeContractAddress,
        account,
        ethers.utils.parseEther(data.amount.toString())
      );
      releaseTx.wait();
    } else {
      let claimTx = await targetBridge.claim(
        nativeContractAddress,
        newToken.tokenName,
        newToken.tokenSymbol,
        ethers.utils.parseEther(data.amount.toString()),
        account
      );
      claimTx.wait();
    }
  };

  if (!!nativeBridge && !!targetBridge) {
    const filterTokensLocked = nativeBridge.filters.LogTokensLocked(
      null,
      account,
      null
    );

    const filterTokensClaimed = nativeBridge.filters.LogTokensClaimed(
      null,
      account,
      null
    );

    const filterTokensBurned = nativeBridge.filters.LogTokensBurned(
      null,
      account,
      null
    );

    const filterTokensReleased = nativeBridge.filters.LogTokensReleased(
      account,
      null
    );

    nativeBridge.on(filterTokensLocked, (tokenAddress, sender, amount) => {
      console.log(tokenAddress, sender, amount);
      setLoading(false);
      setShowScreen(3);
    });

    targetBridge.on(filterTokensClaimed, (tokenAddress, reciever, amount) => {
      console.log(tokenAddress, reciever, amount);
      setTgtContractAddress(tokenAddress);
      setLoading(false);
      setShowScreen(5);
    });

    targetBridge.on(filterTokensBurned, (tokenAddress, sender, amount) => {
      console.log(tokenAddress, sender, amount);
      setLoading(false);
      setShowScreen(3);
    });

    nativeBridge.on(filterTokensReleased, (reciever, amount) => {
      console.log(reciever, amount);
      setLoading(false);
      setShowScreen(0);
    });
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <div>
        <Head>
          <title>Basic Bridge</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header>
          <h1>BUB</h1>
          <h4>basic useless bridge</h4>
        </header>

        <main>
          <Box sx={{ margin: 5 }}>
            <Account triedToEagerConnect={triedToEagerConnect} />
          </Box>
          {isConnected && (
            <section>
              <Container maxWidth="sm">
                <Card variant="outlined">
                  <Paper>
                    {showScreen === 0 && (
                      <section>
                        <Box sx={{ padding: 2 }}>
                          Please enter the token address that is on Rinkeby
                          Testnet
                        </Box>
                        <TextField
                          id="outlined-token-addr"
                          label="Token Address"
                          value={nativeContractAddress}
                          onChange={(e) =>
                            setNatContractAddress(e.target.value)
                          }
                          margin="normal"
                        />
                        <div>
                          <Button
                            sx={{ margin: 2 }}
                            variant="outlined"
                            onClick={async () => {
                              if (
                                ethers.utils.isAddress(nativeContractAddress)
                              ) {
                                if (chainId !== nativeChainId) {
                                  setLoading(true);
                                  let address =
                                    await targetBridge.getCorrespondingContract(
                                      nativeContractAddress
                                    );
                                  setTgtContractAddress(address);
                                  setLoading(false);
                                }
                                setShowScreen(1);
                              } else {
                                alert("Please enter valid address");
                              }
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </section>
                    )}
                    {showScreen === 1 && (
                      <section>
                        {chainId === nativeChainId && (
                          <LockForm
                            setForm={reviewLockBurnForm}
                            contractAddress={nativeContractAddress}
                          />
                        )}
                        {chainId !== nativeChainId && (
                          <BurnForm
                            setForm={reviewLockBurnForm}
                            contractAddress={targetContractAddress}
                          />
                        )}
                      </section>
                    )}
                    {showScreen === 2 && (
                      <section>
                        <SummaryScreen
                          form={form}
                          nativeContractAddress={nativeContractAddress}
                          targetContractAddress={targetContractAddress}
                          onExecute={executeLockBurn}
                        />
                      </section>
                    )}
                    {showScreen === 3 && (
                      <section>
                        <SwitchNetwork form={form} onSwitch={onSwitch} />
                      </section>
                    )}
                    {showScreen === 4 && (
                      <section>
                        <ClaimReleaseForm
                          form={form}
                          executeClaimRelease={executeClaimRelease}
                        />
                      </section>
                    )}
                    {showScreen === 5 && (
                      <section>
                        <Box sx={{ padding: 3 }}>
                          <p>
                            Target network contract address is:{" "}
                            {targetContractAddress}
                          </p>
                          <Button
                            sx={{ margin: 2 }}
                            variant="outlined"
                            onClick={() => setShowScreen(1)}
                          >
                            Go Back
                          </Button>
                        </Box>
                      </section>
                    )}
                  </Paper>
                </Card>
              </Container>
            </section>
          )}
          {isLoading && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              onClick={() => setLoading(false)}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </main>

        <footer>DISCLAIMER: still in development not safe do not use!!!</footer>

        <style jsx>{`
          header {
            text-align: center;
            margin-bottom: 5%;
          }

          main {
            text-align: center;
            background: #121212;
          }

          footer {
            position: absolute;
            bottom: 0px;
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}

export default Home;
