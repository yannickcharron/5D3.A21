import prompSync from 'prompt-sync';
import crypto from 'crypto';

import HashingHelper from './HashingHelper.js';
import PasswordHelper from './PasswordHelper.js';

const read = prompSync();

//const clearText = read('Entrer le texte à hasher: ');
const clearText = 'Yannick';
console.log(clearText);

const hashSha256 = HashingHelper.sha256(clearText);
console.log(hashSha256.length);
console.log(hashSha256); 

const hashSha3 = HashingHelper.sha3(clearText);
console.log(hashSha3.length);
console.log(hashSha3);

const monMessage = 'Le cours de sécurité de jeudi';
const key = 'maCleYannick';

console.log('HMAC');
const hmac = HashingHelper.hmac(monMessage, key);
console.log(hmac);

const telephone = {
    message: monMessage,
    hmac: hmac,
    sha: HashingHelper.sha256(monMessage)
}
console.log(telephone);

//ATiujDHbBkngmD4h9kvv5fTumPCVLTEDjSu2IR5Bbow=

const salt = crypto.randomBytes(64).toString('hex');
const motDePasse = PasswordHelper.pbkdf2('KiwiLeChat', salt);

console.log(motDePasse);

const pbkdf2Verify = PasswordHelper.pbkdf2Verify(motDePasse.hash, motDePasse.salt, 'KiwiLeChat');
console.log(pbkdf2Verify);

// function simple(toHash) {
//     return toHash.length % 10;
// }

// function md5(toHash) { //!Attention ne pas utiliser, algo plus vraiment fiable.
//     return crypto.createHash('md5').update(toHash).digest('hex');
// }










