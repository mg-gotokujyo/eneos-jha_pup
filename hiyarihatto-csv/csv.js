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
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],headless:false,slowMo:20});
    let csv = csvData;


    try{
      console.log(csv[0][1])
        const page = await browser.newPage();

        await page.setViewport({ width: 1400, height: 600});	// default 800*400
        //HPに移動してログイン
        await page.goto("https://demo.service.kakanai.com/eneos_ai");
        //ログインまで
        

        await page.waitForTimeout(500)
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')
        await page.waitForTimeout(500)
        await page.keyboard.sendCharacter("demo119@service.kakanai.com")
        await page.waitForTimeout(500)
        await page.keyboard.press('Tab')
        await page.keyboard.sendCharacter("9FbfcCuOcYwrWM1U")
        await page.waitForTimeout(500)
        await page.keyboard.press('Enter')
        await action.clickspanButton(page,"設定")
        await action.clickspanButton(page,"ユーザ情報一覧ページ")
        for(let i =0; i<100; i++){
        await action.clickspanButton(page,"新規作成")
        await page.waitForTimeout(500)
        await page.keyboard.press('Tab')
        await page.keyboard.press('Tab')       
        await page.waitForTimeout(500)
        await page.keyboard.press('Tab')       
        await page.waitForTimeout(500)
        await page.keyboard.press('Tab')       
        await page.waitForTimeout(500)
 

        await page.keyboard.sendCharacter(csv[i][0])
        await page.keyboard.press('Tab')       
        await page.waitForTimeout(500)


        await page.keyboard.sendCharacter(csv[i][1])
        await page.keyboard.press('Tab')       
        await page.waitForTimeout(500)
        await page.keyboard.sendCharacter(csv[i][2])
        await action.clicklabelButton(page,csv[i][3])
        //await action.clicklabelButton(page,"生年月日")
        //await page.keyboard.sendCharacter("")
        //await action.clicklabelButton(page,"入社年月日")
        //await page.keyboard.sendCharacter("")
        await action.clicklabelButton(page,"所属")
        await action.clickdivButton(page,csv[i][4])
        await action.clicklabelButton(page,"係")
        await action.clickdivButton(page,csv[i][5])
        await action.clickSendButton(page,"送信")


        }  

    }catch(e){
        console.log(e)
        process.exit(1)
    }
})();