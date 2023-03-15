//モジュール部分
const puppeteer = require('puppeteer');
//const prompts = require("prompts");
//let fs = require('fs');
//const path = require("path");
//let shell = require('child_process').exec;
//let spawnSync = require('child_process').spawnSync;
//const xlsx = require('xlsx');
//npconst Utils = xlsx.utils;
//エクセルファイルインポート
//let xlsxfile = "product_2022.2.4.xlsx";
//suspiction　かっこ
const fs = require('fs');
const csv = require('csv');

//let workbook = xlsx.readFile(xlsxfile);
//puppetteer部分
(async () => {
	const browser = await puppeteer.launch({
       //  headless:false,
		//  devtools: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']});

	const page = await browser.newPage();
	await page.setViewport({ width: 1200, height: 800 });	// default 800*400
	await page.goto('https://demo.service.kakanai.com/kobeche/login');
    await page.type('input[placeholder="メールアドレスを入力してください"]','demo64@service.kakanai.com');
    await page.type('input[placeholder="パスワードを入力してください"]','Demo@2021v1');
    //ログインまで
    await page.click('[data-test="sign-in-sign-in-button"]');
    await page.waitForTimeout(2000);
    await page.waitForTimeout(2000);
    //ホーム画面
    const elem = await page.$("#app > div > div:nth-child(2) > main > div > div > div > div > div:nth-child(3) > button"); //  page.$()の返り値は単数要素
    await elem.click(); // elemに格納されている要素をクリック
    //console.log(elem);
    await page.waitForTimeout(1000);


    const newcreaet =await page.$("#app > div > div:nth-child(2) > main > div > div > div > div.row > div:nth-child(1) > button");
    await newcreaet.click(0);
    await page.waitForTimeout(2000);

    const productname =await page.$("#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(1) > div:nth-child(1) > div > div > div.v-input__slot.white");
    await productname.click();
    /*
    //トラブル部分
    let array = [];
    let ss = workbook.Sheets["商品名"];

    //セルの有効レンジを取得する(ただし空白は存在すると看做される)
    let range = ss["!ref"];

    //範囲情報を数値情報へ変換する
    let dRange = Utils.decode_range(range);

    //セル情報を配列にpushする
    for (let rowIndex = dRange.s.r; rowIndex <= dRange.e.r; rowIndex++) {
      //1行目はスルーする（タイトル行の為）
      if(rowIndex == 0){
        console.log("タイトル行スルー");
        continue;
      }
      console.log("kokomade");

      //一時配列を用意
      let tempArray = [];

      for (let colIndex = dRange.s.c; colIndex <= dRange.e.c; colIndex++) {
        //アドレス名を取得する
        let address = Utils.encode_cell({ r: rowIndex, c:colIndex });
        let cell = ss[address];
        console.log("アドレス名を取得する");

        //空のセル
        if (typeof cell !== "undefined" && typeof cell.v !== "undefined") {
          tempArray.push(cell.v);
        }else{
          tempArray.push("");
        }
      }
      console.log("空のセル");

      //書き込み用配列にpushする
      array.push(tempArray);
    }

    //取得した配列データを元に登録作業を開始
    let alength = array.length;
    let clength = alength + 1;
    console.log("取得した配列データを元に登録作業を開始");
    for(let i = 0;i < alength; i++){
      //ユーザ追加画面へ移動
     /* await Promise.all([
        page.goto(useradd, {waitUntil: "domcontentloaded"}),
        page.waitForNavigation(),
      ]);

      //登録フラグがあったらスルー
      if(array[i][10] == "✔"){
        continue;
      }
      console.log("登録フラグがあったらスルー");
      //新規追加ボタンをクリック
      /*await page.waitForSelector('.content > #form_search #btn_addnew');
      await page.click('.content > #form_search #btn_addnew');
      await navigationPromise
     */
      //入力と選択
      await page.waitForTimeout(2000);
      await page.type('#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(1) > div:nth-child(1) > div > div > div.v-input__slot.white', "okok");  //製品コード
      /*await page.waitForTimeout(2000);
      await page.type('#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(1) > div:nth-child(2) > div > div > div.v-input__slot.white > div', array[i][1]); //製品名
      await page.waitForTimeout(2000);
      await page.type('#app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(2) > div > div > div > div', array[i][2]);   //指図者 ここもsuspiciton
      //await page.type('#form_user #user_name_first', array[i][3]);  //工場名
      //suspiction セミコロン
      //追加ボタンをクリック
      //await page.waitForSelector('.ui-panel-wrapper #btn_addnew')
      //console.log("入力できてる");

      await page.waitForTimeout(2000);
                        #app > div > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(9) > div:nth-child(2) > button
      await page.click('#app > div.v-application--wrap > div:nth-child(2) > main > div > div > div > div.container.cols > div > form > div:nth-child(9) > div:nth-child(2) > button');
     //$なしでクリックができるがとうか
      //ページ遷移をウェイト
      // await navigationPromise
      //2秒一応ウェイトさせる
      await page.waitForTimeout(3000);
      //シートに✔マークを入れる作業(2行目以降からスタート)
      /*let count = i + 2;
      ss["K" + count] = { t: "s", v: "✔", w: "✔" };
      ss["!ref"] = "A1" + ":K" + clength;
      workbook.Sheets["商品名"] = ss
      xlsx.writeFile(workbook, xlsxfile);
    }

    //page.onイベントを削除
    //await page.removeAllListeners('dialog');

    //終了メッセージを表示
    const script = `window.alert('処理が完了しました')`;
    await page.addScriptTag({ content: script });


    //ここまで
  */





    fs.createReadStream(__dirname + '/product_name.csv').pipe()
    const readline = require("readline");
    const reader = readline.createInterface({ input: stream });
    reader.on("line", (data) => {
        // 行番号を作成
        let num = i.toString().padStart(5, "0");  // 5文字未満は"0"で埋める
        i++;

        console.log(`${num}: ${data}`);
      });

    fs.createReadStream(__dirname + '/product_name.csv')
    .pipe(csv.parse({columns: true}, function(err, data) {
   const code=(data);

    console.log(code[3]);


      }));


   await page.waitForTimeout(2000);
   await page.screenshot({path:'koubekasei.png'});
	await browser.close();
})();