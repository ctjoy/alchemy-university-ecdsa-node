const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);

console.log("private key:", toHex(privateKey));
console.log("public key:", toHex(publicKey));

// private key: b9b1e9cc0407d74af26d2ee129bf0eff38bad7488b82f16e55d0a61edd7e6540
// public key: 03a3692a192715b3b31fe9af012e72b42e72c8f53b10d3814b40e420ebfddc9e62

// private key: f967896190c246143151c7ead2c36f170987beade6555d4572574b3e84231fa3
// public key: 03317cc4863cb005dd3d034864da6c0ee98c8f284e841fad931306011370b3fad2

// private key: a7cbd3286dfec83315cb33e0301ab4e0c41c469e7a2438532dba1b6aeffb6190
// public key: 036f1ee2073f46bf0e2445dc85baf4cc2a54d3ea307375ee9518454f7329672221