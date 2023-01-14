import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    console.log("private: ", privateKey);

    const address = toHex( secp.getPublicKey(privateKey) );
    console.log("public", address);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log("balance", balance);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Private Key
        <select value={privateKey} onChange={onChange}>
          <option value="d332f2de642b97ff721ccc814fb8f064c4035b0367486c85f9598b262152d515">private key 1</option>
          <option value="a39d5da5c05ed89ed979d8fd5344a532e8f1245f48caa15ae420466b44183565">private key 2</option>
          <option value="22a9033180b6fc8706f194a139656c1231c77f7dd149043797c72460ab19c0cc">private key 3</option>
        </select>

      </label>

      <div>
        Wallet Private Key: <small>{privateKey.slice(0,10)}...</small>
      </div>
      <div>
        Wallet Public Key: <small>{address.slice(0,10)}...</small>
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
