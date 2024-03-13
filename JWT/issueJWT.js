const base64URL = require('base64url');
const crypto = require('crypto');
const signatureFunction = crypto.createSign('RSA-SHA256');
const verifyFunction = crypto.createVerify('RSA-SHA256');
const fs = require('fs');

/**
 * issueance Part
 */
const headerObj = {
    alg: 'RS256',
    typ: 'JWT',
};

const payloadObj = {
    sub: '1234567890',
    name: 'John Doe',
    iat: 1516239022,
    admin: true,
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64URL(headerObjString);
const base64UrlPayload = base64URL(payloadObjString);

signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload);
signatureFunction.end();

const PRIV_KEY = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');
const signatureBase64 = signatureFunction.sign(PRIV_KEY, 'base64');

const signatureBase64URL = base64URL.fromBase64(signatureBase64);

console.log(signatureBase64URL);

/**
 * issueance END
 */

/**
 * verification Part
 */
const JWT =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6dHJ1ZX0.NOU3QYEk_5LKTJzPTjBVrwPFGEf1uZk8BOrHVvp9wydJUIrdZvv0AFs9WR6VEs_odrXxjzkkFvyJpB_K9FRE41goCLxKoEs-VDYPWW7zjRad0Dkxrcdsr24_i_6dRK45H44-RuO1O6EyQPizoNAwbOWGzyuR8G4uJ7nc3ET_AGbniEvO8a94UzsH6QJJgxrHF0_gqrwrJ4ok9k1SELm1KvJhCnbajzv6pcVNOLzXAYVhEKm7CW2Atzz75TiTYs0e9FGpwLsTAZYrvWEQuJa2_CQSBdPbp-dylHEWEg_aSb2n52PNHBJ3FV6a_kZNanUx3oqpURo9YInkkAOcOMsJQH7Xzju9bASUKex9K2CyrVLfpjkQjARsLh785YSDhFOYM_UdMhaEIyIsRjTtAKaXq7Ma_UCE7d7Cr8qGy88yUkZooErOHUTI8hB3C08RFm1yDW6O0ISiCFw6GZzTR1-GKXgj8NbMlbHG894PVKlfj9pAeZhgZniUxvNUqby3uOlFAin0p-CsYDFixlCV6ruaLwmJPYw1dD_bFdATdLUtuEYoWUZzdSkESdtu7SWi10i3EBcC8gHOn0sWUmgxFw9Vq1eocIWMtOzv2IcbIvOaDOrw7xsxJyxO-v1Oq49qf9WRxhdfIxfUJwQmPsGXQaONzQtTibWV0Tx3fwHWiFYE2sEi';

const jwtParts = JWT.split('.');

const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];

verifyFunction.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunction.end();

const jwtSignatureBase64 = base64URL.toBase64(signatureInBase64UrlFormat);

const PUB_KEY = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

const signatureIsValid = verifyFunction.verify(PUB_KEY, jwtSignatureBase64, 'base64');

console.log(signatureIsValid);
