import crypto from 'crypto';
import bcrypt from 'bcrypt';
import argon from 'argon2';

class PasswordHelper {

    pbkdf2(password, salt) {
        //32 = nombre d'octets
        const hrStart = process.hrtime();
        const iteration = 318752; // >= 310 000
    
        const hash = crypto.pbkdf2Sync(password, salt, iteration, 32, 'sha512').toString('base64');
        const hrEnd = process.hrtime(hrStart); 
    
        console.info('Execution time (iteration - %d): %ds %dms', iteration, hrEnd[0], hrEnd[1] / 1000000);
    
        return { salt, hash };
    }

    pbkdf2Verify(passwordHash, salt, password) {

        const iteration = 318752; // >= 310 000
        const hash = crypto.pbkdf2Sync(password, salt, iteration, 32, 'sha512').toString('base64');
        return passwordHash === hash;
    }

    async bcrypt(password) {
        const hrStart = process.hrtime();
        const saltRound = 11;
        const hash = await bcrypt.hash(password, saltRound);
        const hrEnd = process.hrtime(hrStart); 
        console.info('Execution time (iteration - %d): %ds %dms', saltRound, hrEnd[0], hrEnd[1] / 1000000);

        return hash;
    }

    async bcryptVerify(passwordHash, password) {
        return await bcrypt.compare(password, passwordHash);
    }

    //https://github.com/ranisalt/node-argon2/wiki/Options
    async argon2(password) {

        try {
            const hrStart = process.hrtime();
            
            const hash = argon.hash(password, {
                type: argon.argon2id,
                memoryCost: 2 ** 16,
            })

            const hrEnd = process.hrtime(hrStart); 
            console.info('Execution time: %ds %dms', hrEnd[0], hrEnd[1] / 1000000);
            return hash;
        } catch(err) {
            console.log()
        }

    }

    async argonVerify(passwordHash, password) {
        try {
            return await argon.verify(passwordHash, password);
        } catch(err) {
            console.log(err);
        }
    }    


}

export default new PasswordHelper();