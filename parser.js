const fs = require('fs');
const readline = require('readline');


module.exports = {
    getBandsFromFile: function (letter, file) {
        let rl = readline.createInterface({
            input: fs.createReadStream(file)
        });
        let isFirst = true;
        let bands = {};
        return new Promise(function (resolve, reject) {
            rl.on('line', function (line) {
                let testedLine = line;
                if (line.toLowerCase().startsWith('the ')) {
                    testedLine = line.slice(4)
                }
                if (testedLine.toLowerCase().startsWith(letter.toLowerCase()) && !isFirst) {
                    let bandName = line.split(',')[0];
                    bands[bandName] = line.split(',')[1]
                }
                isFirst = false;
            });
            rl.on('close', function () {
                resolve(bands)
            });
        })
    }
};