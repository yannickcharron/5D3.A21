import crypto from 'crypto';
import SimpleCipher from './SimpleCipher.js';
import SymetricCipher from './SymetricCipher.js';

const simpleCipher = SimpleCipher.cipher('Mon message secret');
console.log(simpleCipher);

const simplerDecipher = SimpleCipher.decipher(simpleCipher);
console.log(simplerDecipher);

// const cipherList = crypto.getCiphers();
// cipherList.forEach(c => {
//     console.log(c);
// });

const RC4Key = crypto.randomBytes(32);
const RC4Cipher = SymetricCipher.encryptRC4('Mon Message Secret RC4', RC4Key);
console.log(RC4Cipher);

const RC4Decipher = SymetricCipher.decryptRC4(RC4Cipher, RC4Key);
console.log(RC4Decipher);

const keyAES = crypto.createHash('sha256').update('YannickKey').digest();
const AESCipher = SymetricCipher.encryptAES('Mon message secret AES dfgd gdfgdfgfdg', keyAES);
console.log(AESCipher);

const AESDecipher = SymetricCipher.decryptAES(AESCipher, keyAES);
console.log(AESDecipher);
