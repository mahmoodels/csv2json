const path = require('path');
const fs = require('fs');


fs.readFile(path.join(__dirname, 'customer-data.csv'), (err, data) => {
    if (err)
        return console.error(err);

    var csv = data.toString('utf-8');
    var arr = csv.split(/\r?\n/);
    var res = [];
    arr.forEach((elmnt, ind) => {
        if (ind == 0) { }
        else {
            let nod = {};
            for (let i = 0; i < arr[0].split(',').length; i++) {
                nod[arr[0].split(',')[i]] = elmnt.split(',')[i];
            }
            res[res.length] = nod;
        }
    });
    fs.writeFile(path.join(__dirname, 'customer-data.json'), JSON.stringify(res,null,2), (err) => {
        if (err)
            return console.error(err);
        else
            console.log('successfuly CSV converted');
    });
});
