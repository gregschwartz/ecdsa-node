import { useState } from "react";
import server from "./server";
import { sha256 } from "ethereum-cryptography/sha256";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const address = secp.getPublicKey(privateKey);

    var payload = {
      sender: toHex(address),
      amount: parseInt(sendAmount),
      recipient: recipient,
    };
    const hash = sha256(Uint8Array.from(JSON.stringify(payload)));
    payload["signature"] = toHex(secp.signSync(hash, privateKey));

    try {
      const {
        data: { balance },
      } = await server.post(`send`, payload);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient

        <select value={recipient} onChange={setValue(setRecipient)}>
          <option value="04b2e9624c081cc5ba69de1a0799e39c4c92c8088dcba7ad9f0767696b9cba3c039e5cf65533edf8f07b3cb9c9845321e8adf55e127258be814abb1e8863d8503d">public key 1</option>
          <option value="044aa417a82ddab093bb4c8f567cb7400f978337f159a708dd6a719f0dcb84565129c0f2e368b19df28a10cd0a1c1add2b553ea9192622ae2532240ac15ee07531">public key 2</option>
          <option value="0462290ebc99dd81980148bc64742e277ed353a19309ede08a3c4fa09fba03749f92f592001c4b6e12d6f7d02aef361c803dfe781c040c1740fa03710a55503766">public key 3</option>
        </select>
      </label>
      <div>
        Wallet Public Key: <small>{recipient.slice(0,10)}...</small>
      </div>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
