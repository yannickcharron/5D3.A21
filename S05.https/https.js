import fs from 'fs';
import https from 'https';
import express from 'express';


const privateKey = fs.readFileSync('.private/selfsigned.key');
const certificate = fs.readFileSync('.private/selfsigned.crt');

const app = express();
app.use(express.json());

const credentials = { key: privateKey, cert: certificate };


app.get('/', (req, res) => {
    res.status(200).send('Mon nouveau message');
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log('Serveur en fonction');
});