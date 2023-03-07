//ファイル読み込み
const fs = require("fs");

const readFile = async function(directory,filename){
    const fileData = fs.readFileSync(directory+"/"+filename);
    const lines = fileData.toString().split(/\r\n|\n/);
    let data = [];
    for (var line of lines) {
        let arr = [];
        let tmp = line.split(",");
        let flag = false;

        let tt = [];
        for (var t of tmp) {
            if ( !flag ){
                if ( !t.startsWith('\"') ){
                    arr.push(t)
                }else{
                    flag = true
                    tt.push(t.slice(1))
                }
            }else{
                if ( !t.endsWith('\"') ){
                    tt.push(t)
                }else{
                    flag = false
                    tt.push(t.slice(0,-1))
                    arr.push(tt)
                    tt = [];
                }
            }
        }
        //
        data.push(arr)
    }
    return data
}

exports.readFile = readFile;