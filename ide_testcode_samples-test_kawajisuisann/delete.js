//puppeteerの用意
const puppeteer = require('puppeteer');
//各種操作メソッドを取得
const action =  require('./action/action');
const addition = require('./action/Data_addition');
const check = require('./action/check');
const csvImport = require('./action/csvImport');

//ファイル読み込み
 const csvDirectory = "./csv"
 const filename = "data.csv"
//csvファイルを読み込み
const readFile =  require('./readFile/readFile');

//非同期処理内で実行
(async () => {
     const csvData = await readFile.readFile(csvDirectory,filename);
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],headless:true,slowMo:5});

    try{
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 1200 });	// default 800*400
        //HPに移動してログイン
        await action.kakanaiLogin(page,'https://service.kakanai.com/eneos-mizushima/','demo105@service.kakanai.com','Emps5171');
        //ログインまで


        // 車両情報クリック
        await action.clickspanButton(page,"設定")
        await action.clickspanButton(page,"ユーザ設定")
        for(let needdetete = 0; needdetete < 662; needdetete++){
            await page.waitForTimeout(2000);
            await page.click("#app > div > div:nth-child(2) > main > div > div > div > div:nth-child(3) > div > div.v-data-table.theme--light > div.v-data-table__wrapper > table > tbody > tr:nth-child(1)")
            await action.clickspanButton(page,"削除")
            await action.acceptdialog(page);

        }
       

    }catch(e){
        console.log(e)
        process.exit(1)
    }
})();