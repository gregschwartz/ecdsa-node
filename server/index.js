const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

var balances = {
  "04b2e9624c081cc5ba69de1a0799e39c4c92c8088dcba7ad9f0767696b9cba3c039e5cf65533edf8f07b3cb9c9845321e8adf55e127258be814abb1e8863d8503d": 100,
  "044aa417a82ddab093bb4c8f567cb7400f978337f159a708dd6a719f0dcb84565129c0f2e368b19df28a10cd0a1c1add2b553ea9192622ae2532240ac15ee07531": 100,
  "0462290ebc99dd81980148bc64742e277ed353a19309ede08a3c4fa09fba03749f92f592001c4b6e12d6f7d02aef361c803dfe781c040c1740fa03710a55503766": 100,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, signature, recipient, amount } = req.body;

  const payload = {
    sender: sender,
    amount: amount,
    recipient: recipient,
  };
  const hash = sha256(Uint8Array.from(JSON.stringify(payload)));

  if (!secp.verify(signature, hash, sender)) {
    res.status(400).send({ message: "Invalid signature" });
  } else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
