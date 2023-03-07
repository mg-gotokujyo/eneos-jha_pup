// csv一行のデータを取りこみ、取り込んだデータを返す
const csvDirectory = "./csv/"
const filename = "data.csv"
const readFile =  require('../readFile/readFile');
const csvData =  readFile.readFile(csvDirectory,filename)

const Importcsv_Linedata = async function(){
    //
    // return Linedata
};
exports.Importcsv_Linedata = Importcsv_Linedata;