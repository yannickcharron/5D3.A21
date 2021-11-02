class SimpleCipher {

    alphabetPosition(text) {

        const letters = [... text].map(l => {
            const position = parseInt(l, 36) - 9;
            if(isNaN(position)) {
                return '00';
            }
            if(position < 10) {
                return `0${position}`;
            }
            return position.toString();

        });

        return letters;
        
    }

    cipher(text) {
        return this.alphabetPosition(text).join('');
    }

    decipher(text) {

        let decipherMessage = '';
        const letters = text.match(/.{2}/g);

        letters.forEach(l => {
            if(l === '00') {
                decipherMessage += ' ';
            } else {
                decipherMessage += String.fromCharCode(96 + parseInt(l, 10));
            }
        });

        return decipherMessage;
        
    } 
    


}

export default new SimpleCipher();