const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { hexToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const decoder = (key, value) => {
  if (key === "r" || key === "s") {
      return BigInt(value);
  }
  return value;
};

const balances = {
  "03a3692a192715b3b31fe9af012e72b42e72c8f53b10d3814b40e420ebfddc9e62": 100,
  "03317cc4863cb005dd3d034864da6c0ee98c8f284e841fad931306011370b3fad2": 50,
  "036f1ee2073f46bf0e2445dc85baf4cc2a54d3ea307375ee9518454f7329672221": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, messageHash } = req.body;
  const sign = JSON.parse(signature, decoder);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const message = hexToBytes(messageHash)
  const isSigned = secp256k1.verify(sign, message, sender);
  if (!isSigned) {
    res.status(400).send({ message: "Not valid!" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
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
