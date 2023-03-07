///puppeteerの用意
const puppeteer = require('../../node_modules/puppeteer');
//各種操作メソッドを取得
const action =  require('../../action/action');
const input =  require('../../action/input');
//ファイル読み込み
const csvDirectory = "./csv/kobeche"
const filename = "ProductMaster220221v2.csv"
//csvファイルを読み込み
const readFile =  require('../../readFile/readFile');
const param = require('./param');
const MainTest = async function(p){
    console.log("kobeche")
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
        //マスタ設定に移動
        await action.clickMove(page,"#app > div > div:nth-child(2) > main > div > div > div > div > div:nth-child(2) > button");
        //個別マスタ設定
        await action.clickMove(page,"#app > div > div:nth-child(2) > main > div > div > div > div.row.justify-center.align-content-center > div:nth-child(1) > button");
        //各項目を入力
        let masterData = {
            product: csvData[2][0],
            first: true,
            count1: 0,
            count2: 0,
            count3: 0,
            count4: 0,
            count5: 0,
        };
        //一覧→新規作成ページへ移動
        await action.clickMove(page,'#app > div > div:nth-child(2) > main > div > div > div > div.row > div:nth-child(1) > button');
        //
        //マスタ作成日
        //商品
        let box = param.ProductList;
        let boxStlr = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(2) > div > div > div > div.v-input__slot.white > fieldset"
        page.waitForTimeout(1000);
        //商品を選択
        await action.screenshot(page,"0-1");
        await input.inputSelectBox(page,boxStlr,box, csvData[2][0]);
        await action.screenshot(page,"1");
        console.log("新しいマスタを作成:",csvData[2][0])
        //商品一覧を取得
        let i = 0;
        for (let csv of csvData) {
            if ( 2 <= i ){
                if ( csv[0] != masterData.product) {
                    //送信設定ボタンを押す
                    await action.screenshot(page,i+"-"+csv[0]);
                    await action.clickSendButton(page,"送信");
                    //一覧→新規作成ページへ移動
                    await action.clickMove(page,'#app > div > div:nth-child(2) > main > div > div > div > div.row > div:nth-child(1) > button');
                    //新しいマスタを作成
                    console.log("新しいマスタを作成:",csv[0])
                    masterData.product= csv[0]
                    masterData.first = true
                    masterData.count1 = 0
                    masterData.count2 = 0
                    masterData.count3 = 0
                    masterData.count4 = 0
                    masterData.count5 = 0
                    //商品を選択
                    await input.inputSelectBox(page,boxStlr,box, csv[0]);
                }
                //作業点検表
                if ( csv[1] != "" ){
                    //各セレクター
                    let s1 = "#app > div.v-application--wrap > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div > div > div > form > div:nth-child(2) > div > div > div > div";
                    let s2 = "#app > div.v-application--wrap > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div > div > div > form > div:nth-child(3) > div > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot";
                    let xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[4]/div[3]/div/button[2]/span';
                    //
                    if ( masterData.count1 > 0 ) {
                        s1 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(4) > div:nth-child('+ (Number(masterData.count1)+Number(2)) +') > div > div > div > div > form > div:nth-child(2) > div > div > div > div > div';
                        s2 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(4) > div:nth-child('+ (Number(masterData.count1)+Number(2)) +') > div:nth-child(1) > div > div > div > form > div:nth-child(3) > div > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot';
                        if ( masterData.count1 > 1 ) {
                            xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[4]/div['+ (Number(masterData.count1)+Number(2)) +']/div/button[2]/span'
                        }
                        await action.ClickAddButton(page,xPath)
                    }
                    await input.inputTextFiled(page,s1,csv[1]);   //機器名
                    await input.inputPulsTextBox(page,s2,csv[2]); //選択肢
                    masterData.count1++
                }
                //工程仕込み
                if ( csv[3] != "" ){
                    //各セレクター
                    let s1 = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(5) > div:nth-child(2) > div > div > div > div > form > div:nth-child(2) > div > div > div > div > div";
                    let s2 = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(5) > div:nth-child(2) > div > div > div > div > form > div:nth-child(3) > div > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot";
                    let xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[5]/div[3]/div/button[2]';
                    //
                    if ( masterData.count2 > 0 ) {
                        s1 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(5) > div:nth-child('+ (Number(masterData.count2)+Number(2)) +') > div > div > div > div > form > div:nth-child(2) > div > div > div > div > div';
                        s2 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(5) > div:nth-child('+ (Number(masterData.count2)+Number(2)) +') > div > div > div > div > form > div:nth-child(3) > div > div > div > div.v-input__control > div.v-input__slot.white > div.v-text-field__slot';
                        if ( masterData.count2 > 1 ) {
                            xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[4]/div['+ (Number(masterData.count2)+Number(2)) +']/div/button[2]/span'
                        }
                        await action.ClickAddButton(page,xPath)
                    }
                    await input.inputTextFiled(page,s1,csv[1]);   //機器名
                    await input.inputPulsTextBox(page,s2,csv[2]); //選択肢
                    //await input.inputSelectBox(page,box,);/元データにないのでスキップ
                    //let box = param.ProductList;
                    masterData.count2++
                }
                //分析
                if ( csv[5] != "" ){
                    let s1 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(6) > div:nth-child('+(Number(masterData.count3)+Number(2))+') > div > div > div > div > form > div:nth-child(2) > div:nth-child(1) > div > div > div > div';
                    let s2 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(6) > div:nth-child('+(Number(masterData.count3)+Number(2))+') > div > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div > div > div > div';
                    //let s3 = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(8) > div:nth-child(2) > div > div > div > div > form > div > div > div > div > div > div";
                    //let s4 = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(8) > div:nth-child(2) > div > div > div > div > form > div > div > div > div > div > div";
                    //let s5 = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(8) > div:nth-child(2) > div > div > div > div > form > div > div > div > div > div > div";
                    let xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[6]/div[3]/div/button[2]/span';
                    //
                    if ( masterData.count3 > 1 ) {
                        xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[6]/div['+(Number(masterData.count3)+Number(2))+']/div/button[2]'
                    }
                    if ( masterData.count3 > 0 ) {
                        //追加ボタンを押す
                        await action.ClickAddButton(page,xPath)
                    }
                    await input.inputTextFiled(page,s1,csv[5]);//試験項目
                    await input.inputTextFiled(page,s2,csv[6]);//試験方法
                    //規格値 //一旦は無し
                    //await input.inputTextFiled(page,s2,csv[15]);//入力形式
                    //試験結果 //一旦は無し
                    masterData.count3++
                }
                //準備2
                if ( csv[10] != "" ){
                    let s1 ='#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(7) > div:nth-child(2) > div > div > div > div > form > div > div:nth-child(1) > div > div > div > div'
                    let xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[7]/div[3]/div/button[2]/span';
                    //
                    if ( masterData.count4 > 1 ) {
                        s1 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(7) > div:nth-child('+(Number(masterData.count4)+Number(2))+') > div > div > div > div > form > div > div:nth-child(1) > div > div > div > div';
                        xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[7]/div['+(Number(masterData.count4)+Number(2))+']/div/button[2]'
                    }
                    if ( masterData.count4 > 0 ) {
                        //追加ボタンを押す
                        await action.ClickAddButton(page,xPath)
                    }
                    await input.inputTextFiled(page,s1,csv[10]);   //使用包材
                    masterData.count4++
                }
                //充填
                if ( csv[13] != "" ){
                    let s1 = "#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(8) > div:nth-child(2) > div > div > div > div > form > div > div > div > div > div > div";
                    let xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[8]/div[3]/div/button[2]/span';
                    //
                    if ( masterData.count5 > 1 ) {
                        xPath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[8]/div['+(Number(masterData.count5)+Number(2))+']/div/button[2]/span'
                    }
                    if ( masterData.count5 > 0 ) {
                        s1 = '#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(8) > div:nth-child('+(Number(masterData.count5)+Number(2))+') > div > div > div > div > form > div > div > div > div > div > div';
                        //追加ボタンを押す
                        await action.ClickAddButton(page,xPath)
                    }
                    await input.inputTextFiled(page,s1,csv[13]);   //確認事項
                    masterData.count5++
                }
                masterData.first= false

            }
            i++;
        }
        //最後の送信ボタンを押す
        await action.screenshot(page,"send");
        await action.clickSendButton(page,"送信");
        return "END kobeche"
    }catch(e){
        console.log(e)
        return "failed kobeche"
    }

};

exports.MainTest = MainTest;
