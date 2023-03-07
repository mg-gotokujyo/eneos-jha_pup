// csvから取り込んだ一行データを入力する
// 登録するcsv一行データが引数で渡される
// 登録出来なかったときlist_iを返す
const csvDirectory = "./csv"
const filename = "data.csv"
const readFile =  require('../readFile/readFile');
let  csvData = readFile.readFile(csvDirectory,filename);
const CSV_Line_Inputcar = async function(csvData,list_i){
    console.log(csvData);
};
exports.CSV_Line_Inputcar = CSV_Line_Inputcar;

const CSV_Line_Inputuser = async function(csvData,list_i){
    //
};
exports.CSV_Line_Inputuser = CSV_Line_Inputuser;