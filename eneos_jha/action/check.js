// カウント用変数の比較と入力件数
// エラーがない場合Detaildata(carDetail)には""が入っている
const count_check = async function(Register_count,csvlist_i,Error_list){
    console.log(Register_count + "件登録しました");

    if(Error_list.length !== 0){
        console.log("入力エラー");
        for(let Error_list_i of Error_list){
            console.log(Error_list_i);
        }
    } else {
        if(Register_count == csvlist_i){
            console.log("一致しました");
        } else {
            console.log("一致しませんでした");
        }
    }
};
exports.count_check = count_check;
//完成