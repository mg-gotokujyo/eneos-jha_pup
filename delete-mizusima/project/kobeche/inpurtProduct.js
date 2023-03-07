///puppeteerの用意
const puppeteer = require('puppeteer');
//各種操作メソッドを取得
const action =  require('../../action/action');
const input =  require('../../action/input');
//ファイル読み込み
const csvDirectory = "./csv"
const filename = "data.csv"
//csvファイルを読み込み
const readFile =  require('../../readFile/readFile');
//非同期処理内で実行
(async () => {
    const csvData = await readFile.readFile(csvDirectory,filename)
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    try{
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });	// default 800*400
        await page.setDefaultNavigationTimeout(0);
        //HPに移動してログイン
        await action.kakanaiLogin(page,'https://demo.service.kakanai.com/kobeche/login','demo64@service.kakanai.com','Demo@2021v1');
        //ホーム画面
        await action.screenshot(page,"Home");
        //商品名一覧に移動
        await action.clickMove(page,"#app > div > div:nth-child(2) > main > div > div > div > div > div:nth-child(3) > button > span");
        //各項目を入力
        let count = 0;
        for (let csv of csvData) {
            //一覧→新規作成ページへ移動
            await action.clickMove(page,'#app > div > div:nth-child(2) > main > div > div > div > div.row > div:nth-child(1) > button');
            //商品名登録
            await input.inputTextFiled(page,0,csv[0]); //製品コード
            await input.inputTextFiled(page,1,input.convertZenkaku(csv[1])); //製品名
            await input.inputTextFiled(page,2,csv[2]); //指図者(製品管理責任者)
            //工場名
            let box = [ "本社工場","第２工場" ]
            await input.inputSelectBox(page,"#app > div.v-application--wrap > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(3) > div > div > div > div.v-input__slot.white > div.v-select__slot > div.v-select__selections",box,csv[3]);
            await input.inputTextFiled(page,3,csv[4]); //製造工程
            await input.inputTextFiled(page,4,csv[5]); //資材
            //見込み収量下限
            await input.inputNumber(page,"#app > div.v-application--wrap > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div > div > div.v-input__slot.white",csv[6]);
            //見込み収量上限
            await input.inputNumber(page,"#app > div.v-application--wrap > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div > div > div.v-input__slot.white",csv[7]);
            //小分け明細(一旦小分け明細は1個だけ)
            await input.inputPulsTextBox(page,"#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(7) > div > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot",csv[8]);
            //fmt.Println("Debug:",)           #app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(7) > div:nth-child(2) > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot
            //#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(7) > div:nth-child(3) > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot
            //await input.inputTextFiled(page,8,csv[i][9]); //(商品名)は自動
            //await input.inputTextFiled(page,9,csv[i][10]);//小カテゴリ名(空)
            //
            await action.clickSendButton(page,"送信");  //送信ボタンを押して保存
            if (count == 0){
                break;
            }
            count++;
        }
        //終了
        console.log("END")
        process.exit(1)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
})();
