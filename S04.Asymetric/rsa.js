import crypto from 'crypto';

let { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

const monMessageSecret = 'Le message vraiment secret';

const encryptedData = crypto.publicEncrypt({
    key:publicKey,
    padding:crypto.constants.RSA_PKCS1_OAEP_PADDING
}, Buffer.from(monMessageSecret))

console.log(encryptedData.toString('base64'));

const decryptedData = crypto.privateDecrypt({
    key:privateKey,
    padding:crypto.constants.RSA_PKCS1_OAEP_PADDING
}, encryptedData);

console.log(decryptedData.toString());