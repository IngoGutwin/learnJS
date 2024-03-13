const fs = require('node:fs');
const { encryptWithPublicKey, encryptWithPrivateKey } = require('./encrypt');
const { decryptWithPrivateKey } = require('./decrypt');

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

// Stores a Buffer Object
const encryptedMessage = encryptWithPublicKey(publicKey, 'Super secret message');

console.log(encryptedMessage.toString());

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());
