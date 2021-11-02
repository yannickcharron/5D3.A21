import crypto from 'crypto';

class SymetricCipher {

    encryptRC4(clear, key) {
        const cipher = crypto.createCipheriv('rc4', key, '');
        const cipherText = cipher.update(clear, 'utf-8', 'hex');
        return cipherText;
    }

    decryptRC4(encrypted, key) {
        const decipher = crypto.createDecipheriv('rc4', key, '');
        const decipherText = decipher.update(encrypted, 'hex', 'utf-8');
        return decipherText;
    }

    encryptAES(clear, key) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

        let encrypted = cipher.update(clear);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }

    decryptAES(encrypted, key) {
        const encryptedParts = encrypted.split(':');

        const iv = Buffer.from(encryptedParts.shift(), 'hex');
        const encryptedText = Buffer.from(encryptedParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

export default new SymetricCipher();