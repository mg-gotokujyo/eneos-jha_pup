const screenshotDirectory = "./image"
let screenshotname = "result"
let screenshotNumber = 0;

//スクリーンショット
const screenshot = async function(page,filename){
    if (typeof filename == "undefined"){
        filename = screenshotname+String(screenshotNumber);
    }
    await page.screenshot({ path: screenshotDirectory+"/"+filename+".png" });
    screenshotNumber++;
};
exports.screenshot = screenshot;
//クリックして移動
let moveCount = 0;
const clickMove = async function(page,tag){
    const elem = await page.$(tag);
    await elem.click(); // elemに格納されている要素をクリック
    await page.waitForTimeout(2000); //移動のため1.5秒待機
    moveCount++
    return page
};
exports.clickMove = clickMove;
//カカナイへログイン
const kakanaiLogin = async function(page,URL,email,password){
    await page.goto(URL);
    //ログイン処理
    await page.type('input[placeholder="ユーザ名を入力してください"]',email);
    await page.type('input[placeholder="パスワードを入力してください"]',password);
    await this.clickMove(page,'[data-test="sign-in-sign-in-button"]')

    //await page.waitForTimeout(5000);
};
exports.kakanaiLogin = kakanaiLogin;
//
const ClickSendButton = async function(page,label){
    let selector = "//span[contains(text(), '"+label+"')]"
    const [button] = await page.$x(selector);
    await button.click();
    page.once('dialog', async dialog => {
        await dialog.accept();
        await page.removeAllListeners();

    });
    await page.waitForTimeout(3000);
};
exports.clickSendButton = ClickSendButton;
//
const ClickAddButton = async function(page,xpath){
    /*
        let xpath = '//*[@id="app"]/div/div[1]/main/div/div/div/div[2]/div/form/div[4]/div[3]/div/button[2]/span';
        await page.waitForXPath(xpath);
        const button = await page.$x(xpath);
        await button[0].click()
        //await page.keyboard.press("Enter");
        await page.waitForTimeout(500);
    */
    await page.waitForXPath(xpath);
    const button = await page.$x(xpath);
    await button[0].click()
    //await page.keyboard.press("Enter");
    await page.waitForTimeout(500);
};
exports.ClickAddButton = ClickAddButton;

const ClickdivButton = async function(page,label){
    let selector = "//div[contains(text(), '"+label+"')]"
    await page.waitForXPath(selector);
    const [button] = await page.$x(selector);
    await button.click();
    console.log(label);
    await page.waitForTimeout(300);
    return label;
};
exports.clickdivButton = ClickdivButton;

const ClicklabelButton = async function(page,label){
    let selector = "//label[contains(text(), '"+label+"')]"
    const [button] = await page.$x(selector);
    await button.click();
    console.log(label);
    await page.waitForTimeout(300);
};
exports.clicklabelButton = ClicklabelButton;

const sendtxet = async function (page, eletext, text) {
    await page.click(eletext);
    await page.keyboard.sendCharacter(text);
    await page.waitForTimeout(100);
    console.log(eletext);
  };
  exports.sendtxet = sendtxet;

  const ClickButton = async function (page, tab) {
    await page.waitForSelector(tab);
    await page.click(tab);
    await page.waitForTimeout(150);
  };
  exports.ClickButton = ClickButton;
const clickspanButton = async function(page,label){
    let selector ="//span[contains(text(), '"+label+"')]"
    await page.waitForXPath(selector);
    const [button] = await page.$x(selector);
    await button.click();
    console.log(label);
    await page.waitForTimeout(300);
};
exports.clickspanButton = clickspanButton;
const clickButton = async function(page,label){
    let selector ="//botton[contains(text(), '"+label+"')]"
    await page.waitForXPath(selector);
    const [button] = await page.$x(selector);
    await button.click();
    console.log(label);
    await page.waitForTimeout(300);
};
exports.clickButton = clickButton;
const clicktdButton = async function(page,label){
    let selector ="//td[contains(text(), '"+label+"')]"
    await page.waitForXPath(selector);
    const [button] = await page.$x(selector);
    await button.click();
    console.log(label);
};
exports.clicktdButton = clicktdButton;
const PullDown = async function(page){
    await page.waitForSelector("i.mdi-menu-down");
    const PulldownSelector = "i.mdi-menu-down";
    await page.click(PulldownSelector);
    await page.waitForTimeout(200);
    console.log("pulldown");
}
exports.PullDown = PullDown;

const removeadmini= async function(page){
await page.waitForSelector("div[aria-selected=true]");
let element = await page.$$("div[aria-selected=true]");
var xx= await page.$$("div[aria-selected=false]");
console.log(xx.length);

for(let i =0 ; i<element.length; i++){
let value = await page.evaluate(el => el.textContent, element[i])
console.log(value);
await element[i].click();
}
console.log(element.length);
xx= await page.$$("div[aria-selected=false]");
console.log(xx.length);
}
exports.removeadmini = removeadmini;


const acceptdialog=async(page)=>{
    page.once('dialog', async dialog => {
        await dialog.accept();
        await page.removeAllListeners();



    });

}
exports.acceptdialog = acceptdialog;

const BackbuttonToChengeAmini=async function(page,admini){
    await action.clickspanButton(page,"back");
    await action.clickspanButton(page,"Setting");
  await action.clickspanButton(page,"UserSetting");
  await action.clicktdButton(page,"MG太郎");
  await action.PullDown(page);
  await action.removeadmini(page);
  await action.clickdivButton(page,admini);
  try{
  await action.clickSendButton(page,"send");
  console.log("権限を変えました");}
  catch{
      console.log("エラー");

  }
}
exports.BackbuttonToChengeAmini = BackbuttonToChengeAmini;
let i= 0;

const TrackSettlementNumber=async function(page,label){
    let selector ="//td[contains(text(), '"+label+"')]"
    await page.waitForXPath(selector);
    const [button] = await page.$x(selector);
    await button.click();
    i++
    console.log(`Settlement Number : ${label}      `+    i);
};

exports.TrackSettlementNumber = TrackSettlementNumber;