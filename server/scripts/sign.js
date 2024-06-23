const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    byte_message = utf8ToBytes(message);
    return keccak256(byte_message);
}

const jsonReplacer = (key, value) => typeof value === "bigint" ? value.toString() : value;

// Sender's privateKey
const privateKey = "b9b1e9cc0407d74af26d2ee129bf0eff38bad7488b82f16e55d0a61edd7e6540";
// use Recipient address as message
const message = "03317cc4863cb005dd3d034864da6c0ee98c8f284e841fad931306011370b3fad2";
const messageHash = toHex(hashMessage(message));
const signature = JSON.stringify(secp256k1.sign(messageHash, privateKey), jsonReplacer);

console.log("messageHash: ", messageHash)
console.log("signature: ", signature)