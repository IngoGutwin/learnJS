const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('node:fs');
const { encryptWithPrivateKey, encryptWithPublicKey } = require('./encrypt');
const { decryptWithPublicKey, decryptWithPrivateKey } = require('./decrypt');

const myData = {
    firstName: '',
    lastName: '',
    socialSecurityNumber: 'NO NO NO. Never put personal info in a digitaly \
    signed message since this form of cryptography does not hide the data!'
};

const myDataString = JSON.stringify(myData);

hash.update(myDataString);

const hashedData = hash.digest('hex');

const senderPrivatKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const signedMessage = encryptWithPrivateKey(senderPrivatKey, hashedData);

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
}

module.exports = {
    packageOfDataToSend,
}

