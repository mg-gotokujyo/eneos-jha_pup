
const fs = require('fs');
const parse = require('csv-parse/sync');

const data = fs.readFileSync('./csv/data.csv');
const records = parse.parse(data, {
    columns: true
});
const csv=records[1];
for(let i=0;i<80;i++){
console.log(csv);
}     for(let i=0;i<80;i++){
    console.log(csvData[1][i]+"；"+i);
}

