import fs from 'fs';
import crypto from 'crypto';

generateRSAKey();

function generateRSAKey() {
    let { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
    
    const publicKeyPEM = publicKey.export({
        format:'pem',
        type:'pkcs1'
    });

    console.log(publicKeyPEM);
    fs.writeFileSync('./exports/pem/public.pem', publicKeyPEM);

    const privateKeyPEM = privateKey.export({
        format:'pem',
        type:'pkcs1'
    });

    console.log(privateKeyPEM);
    fs.writeFileSync('./exports/pem/private.pem', privateKeyPEM);

}