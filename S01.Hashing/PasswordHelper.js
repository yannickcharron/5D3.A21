import crypto from 'crypto';

class PasswordHelper {

    pbkdf2(password, salt) {
        //32 = nombre d'octets
        const hrStart = process.hrtime();
        const iteration = 318752; // >= 310 000
    
        const hash = crypto.pbkdf2Sync(password, salt, iteration, 32, 'sha512').toString('base64');
        const hrEnd = process.hrtime(hrStart); 
    
        console.info('Execution time (iteration - %d): %ds %dms', iteration, hrEnd[0], hrEnd[1] / 1000000);
    
        return { salt, hash } ;
    }

    pbkdf2Verify(passwordHash, salt, password) {

        const iteration = 318752; // >= 310 000
        const hash = crypto.pbkdf2Sync(password, salt, iteration, 32, 'sha512').toString('base64');
        return passwordHash === hash;
    }

}

export default new PasswordHelper();