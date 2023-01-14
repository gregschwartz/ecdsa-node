import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Balances from "./Balances";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [_, doUpdate] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} privateKey={privateKey} /><br />
      <Balances privateKey={privateKey} doUpdate={doUpdate}></Balances>
    </div>
  );
}

export default App;
