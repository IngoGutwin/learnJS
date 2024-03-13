/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
const crypto = require("crypto");
const fs = require("node:fs");

function genKeyPair() {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096, // bits - standart for RSA keys
        publicKeyEncoding: {
            type: "pkcs1", // Public Key Cryptography Standards 1
            format: "pem", // Most common formating choice
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });

    fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);

    fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey);
}

genKeyPair();
