const fs = require('fs');
const readline = require('readline');


module.exports = {
    theme: '',
    getThemeNamesToImgFromFile: (letter, file) => {
        let rl = readline.createInterface({
            input: fs.createReadStream(file)
        });
        let isFirst = true;
        let themesNameToImg = {};
        return new Promise(resolve => {
            rl.on('line', (line) => {
                let testedLine = line;
                if (line.toLowerCase().startsWith('the ') && !isFirst) {
                    testedLine = line.slice(4)
                }
                if (testedLine.toLowerCase().startsWith(letter.toLowerCase()) && !isFirst) {
                    themesNameToImg[line.split(',')[0]] = line.split(',')[1]
                }
                if (isFirst) {
                    this.theme = line.split(',')[0];
                    isFirst = false;
                }
            });
            rl.on('close', () => {
                resolve(themesNameToImg)
            });
        })
    }
};