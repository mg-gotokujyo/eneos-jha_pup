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
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],headless:false,slowMo:5,defaultViewport: null});
/**/
 
        const page = await browser.newPage();
     	// default 800*400
       // await page.goto("http://localhost:8128/eneos_jha/")
        //HPに移動してログイン
        await action.kakanaiLogin(page,'http://localhost:8128/eneos_jha/','demo126@service.kakanai.com','kIsLSXF5kr1sdkKe');
        //ログインまで


        // 車両情報クリック
        await action.clickspanButton(page,"JHA【作成・変更】")
           for (let i= 238; i<300; i++){
    let nextcsv=i+1;
    let c= 0;
    let d =0;
    let e= 0;
    let f =0;
    if(csvData[nextcsv]!=undefined){
    if(csvData[nextcsv][5]!=csvData[i][5]){
        console.log(nextcsv+1+"列目は新しい列です")
        await action.clickspanButton(page,"新規作成")
        await page.waitForTimeout(2000);
        await page.click("#A123")
       // await page.click("#app > div > div:nth-child(2) > main > div > div.container.container--fluid > div > div:nth-child(3) > div > div > form > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > div.v-input__slot.white > div.v-input__prepend-inner > div > i")
       await page.keyboard.sendCharacter(await action.formatTime(csvData[1][2]));
       await page.waitForTimeout(2000);

       await page.click("#form7163")
       await page.keyboard.sendCharacter(await action.formatTime(csvData[1][3]));

       //    console.log(csvData[1][2])        
    //    console.log(action.formatTime(csvData[1][2]))

        //await action.clicklabelButton("最終改訂日")
        
        await action.sendtxet(page,Department,csvData[1][1] );     
        await action.sendtxet(page,JhaNumber,csvData[1][4] );
        await action.sendtxet(page,Workname,csvData[1][5] );     
        await action.sendtxet(page,Session,csvData[1][1] );     
        await action.sendtxet(page,PlantName,csvData[1][0] );     
        await action.sendtxet(page,GroupName,csvData[1][1] );     
        //await action.sendtxet(page,traget,csvData[1][1] );
        if(csvData[nextcsv][61]!=csvData[i][61]){
            console.log("作業ステップを追加します")
            c++;
            await action.clickspanButton(page,"作業ステップを追加")
            await page.waitForTimeout(2000)
            await action.clicklabelButton(page,""+c+"作業ステップ")
            await page.keyboard.sendCharacter(csvData[nextcsv][61])

            await action.clicklabelButton(page,""+c+"-"+d+"潜在的な危険要因")
            await page.keyboard.sendCharacter(csvData[nextcsv][62])
            await action.clicklabelButton(page,""+c+"-"+d+"必要な措置、または手順")
            await page.keyboard.sendCharacter(csvData[nextcsv][63])
            d++;

        }
        else{
            await action.clickspanButton(page,"0行を追加")
            await action.clicklabelButton(page,""+e+"作業ステップ")
            await page.keyboard.sendCharacter(csvData[1][61])
            await action.clicklabelButton(page,""+e+"-"+f+"潜在的な危険要因")
            await page.keyboard.sendCharacter(csvData[1][62])
            await action.clicklabelButton(page,""+e+"-"+f+"必要な措置、または手順")
            await page.keyboard.sendCharacter(csvData[1][63])
        }
        
        console.log(csvData[42])
        console.log(csvData[43])

   



       

    }
   // console.log(csvData)





    }else{
        console.log("次の列空だよ")
    }}
   
}
)();