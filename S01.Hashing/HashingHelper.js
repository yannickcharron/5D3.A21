import crypto from 'crypto';

class HashingHelper {

    sha256(toHash, encoding='hex') {
        return crypto.createHash('sha256').update(toHash).digest(encoding);
    }

    sha3(toHash, encoding='hex') {
        return crypto.createHash('sha3-512').update(toHash).digest(encoding);
    }

    hmac(toHash, key, encoding='base64') {
        return crypto.createHmac('sha256', key).update(toHash).digest(encoding);
    }

}

export default new HashingHelper();