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
const { Department, JhaNumber, Workname, Session, PlantName, GroupName, traget } = require('./Def');

//非同期処理内で実行
(async () => {
     const csvData = await readFile.readFile(csvDirectory,filename);
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],headless:false,slowMo:10,defaultViewport: null});
/**/
 
        const page = await browser.newPage();
     	// default 800*400
       // await page.goto("http://localhost:8128/eneos_jha/")
        //HPに移動してログイン
        await action.kakanaiLogin(page,'http://localhost:8128/eneos_jha/','demo141@service.kakanai.com','99Iza!Kbl8WgFCt2');
        //ログインまで
        await action.clickspanButton(page,"設定")
        await action.clickspanButton(page,"ユーザ情報")
        for(let i=1;i<=csvData.length-1;i++){
        console.log(csvData.length)
        await action.clickspanButton(page,"新規作成")
        await page.waitForSelector("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div.container.cols > div > form > div:nth-child(1) > div > div > div > div.v-input__slot > div > label")
        await page.click("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div.container.cols > div > form > div:nth-child(1) > div > div > div > div.v-input__slot > div > label")
        await page.keyboard.sendCharacter(csvData[i][3])
        await page.waitForSelector("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div.container.cols > div > form > div:nth-child(2) > div > div > div > div.v-input__slot > div > label")
        await page.click("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div.container.cols > div > form > div:nth-child(2) > div > div > div > div.v-input__slot > div > label")
        await page.waitForSelector("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div.container.cols > div > form > div:nth-child(3) > div > div > div > div.v-input__slot > div > label")
        await page.keyboard.sendCharacter(csvData[i][5])
        await page.click("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div.container.cols > div > form > div:nth-child(3) > div > div > div > div.v-input__slot > div > label")
        await page.keyboard.sendCharacter(csvData[i][9])
        await action.clicklabelButton(page,"工場名")
        await page.keyboard.sendCharacter(csvData[i][0])
        await action.clicklabelButton(page,"グループ名")
        await page.keyboard.sendCharacter(csvData[i][1])
        await action.clicklabelButton(page,"係")
        await page.keyboard.sendCharacter(csvData[i][2])
        await action.clickSendButton(page,"送信")
        }

}
)();