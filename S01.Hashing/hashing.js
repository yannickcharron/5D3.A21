import prompSync from 'prompt-sync';
import crypto from 'crypto';

const read = prompSync();

const clearText = read('Entrer le texte à hasher: ');
console.log(clearText);

//const simpleHash = simple(clearText);
//console.log(simpleHash);
// const md5Hash = md5(clearText);
// console.log(md5Hash);
// const sha256Hash = sha256(clearText);
// console.log(sha256Hash);

const passwordResult = pbkdf2(clearText,'YannickSalt')
console.log(passwordResult);

function md5(toHash) { //!Attention ne pas utiliser, algo plus vraiment fiable.
    return crypto.createHash('md5').update(toHash).digest('hex');
}

function sha256(toHash) {
    return crypto.createHash('sha256').update(toHash).digest('hex');
}

function pbkdf2(password, salt) {
    //32 = nombre d'octets
    const hrStart = process.hrtime();
    const iteration = 1000;

    const hash = crypto.pbkdf2Sync(password, salt, iteration, 32, 'sha512').toString('base64');
    const hrEnd = process.hrtime(hrStart); 

    console.info('Execution time (iteration - %d): %ds %dms', iteration, hrEnd[0], hrEnd[1] / 1000000);

    return { salt, hash } ;
}

function simple(toHash) {
    return toHash.length % 10;
}