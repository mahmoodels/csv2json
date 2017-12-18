const path = require('path');
const fs = require('fs');

let inputFile = process.argv[2];
if (inputFile == '')
    inputFile = 'customer-data';

fs.readFile(path.join(__dirname, inputFile), (err, data) => {
    if (err)
        return console.error(err);

    var csv = data.toString('utf-8');
    var arr = csv.split(/\r?\n/);
    var res = [];
    arr.forEach((elmnt, ind) => {
        if (ind !== 0) {
            let nod = {};
            let columnsCount = arr[0].split(',').length;
            for (let i = 0; i < columnsCount; i++) {
                let keyName = arr[0].split(',')[i];
                let keyValue = elmnt.split(',')[i]
                nod[keyName] = keyValue;
            }
            res.push(nod);
        }
    });

    let fileNameWithoutExt = inputFile.split('.')[0];
    console.log(fileNameWithoutExt);

    fs.writeFile(path.join(__dirname, `${fileNameWithoutExt}.json`), JSON.stringify(res, null, 2), (err) => {
        if (err)
            return console.error(err);
        else
            console.log('successfuly CSV converted');
    });
});
