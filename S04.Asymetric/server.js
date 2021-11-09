import cors from 'cors';
import axios from 'axios';
import chalk from 'chalk';
import crypto from 'crypto';
import express from 'express';

let { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

const publicKeyPEM = publicKey.export({
    format:'pem',
    type:'pkcs1'
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/.well-knows/public.key', (req, res, next) => {
    res.status(200).json(publicKeyPEM);
});

app.post('/receive', (req, res, next) => {

    const message = req.body;

    const decryptedText = crypto.privateDecrypt(privateKey, Buffer.from(message.text, 'base64'))
    console.log(chalk.green(decryptedText.toString()));
    res.status(200).end();
});

app.post('/send', async (req, res, next) => {

    // const format = {
    //     to:'',
    //     text:''
    // };

    const message = req.body;

    const toPublicKeyResponse = await axios.get(`${message.to}:5000/.well-knows/public.key`);

    if(toPublicKeyResponse.status === 200) {
        const toPublicKey = toPublicKeyResponse.data;
        const toSend = {};
        toSend.from = '192.168.135.23';
        toSend.fromName = 'Yannick';
        toSend.text = crypto.publicEncrypt(toPublicKey, message.text).toString('base64');

        const response = await axios.post(`${message.to}:5000/receive`, toSend);
        if(response.status === 200) {
            console.log(JSON.stringify(toSend));
            res.status(200).end();
        } else {
            console.log(response);
            res.status(500).end();
        }

    } else {
        res.status(500).end();
    }



});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(chalk.blue('Le serveur est démarré'));
});