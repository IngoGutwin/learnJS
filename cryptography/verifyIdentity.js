const crypto = require('crypto');
const fs = require('node:fs');
const { decryptWithPublicKey, decryptWithPrivateKey } = require('./decrypt');

const { packageOfDataToSend } = require('./signMessage');

const hash = crypto.createHash(packageOfDataToSend.algorithm);

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const decryptMessage = decryptWithPublicKey(publicKey, packageOfDataToSend.signedAndEncryptedData);
const decryptMessageHex = decryptMessage.toString(); 

const hashOfOriginal = hash.update(JSON.stringify(packageOfDataToSend.originalData));
const hashOfOriginalHex = hash.digest('hex');

if (hashOfOriginalHex === decryptMessageHex) {
    console.log("Success!");
} else  {
    console.log("Uh oh ... ");
}


