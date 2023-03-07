const action =  require('./action');

//テキストフォームへ入力
const inputTextFiled = async function(page,tag,value){
    let selector = 'div.v-text-field__slot'
    let inputIndex = 0;
    if ( isNaN(tag) ){
        selector = tag
    }else{
        inputIndex = Number(tag)
    }
    if (! await page.$(selector)) {
        console.log('指定したselectorがありません:'+selector)
        return new Error('ページ内にtagがありません:'+selector);
    }
    let rows = await page.$$(selector);
    await (await rows[inputIndex].$('input')).click();
    await page.type(selector, value);
};
exports.inputTextFiled = inputTextFiled;
//
const inputNumber = async function(page,value){

    result = value.toString();
    for await (const char of result) {
        switch (char){
            case "0":
                await page.keyboard.press("0");
                break;
            case "1":
                await page.keyboard.press("1");
                break;
            case "2":
                await page.keyboard.press("2");
                break;
            case "3":
                await page.keyboard.press("3");
                break;
            case "4":
                await page.keyboard.press("4");
                break;
            case "5":
                await page.keyboard.press("5");
                break;
            case "6":
                await page.keyboard.press("6");
                break;
            case "7":
                await page.keyboard.press("7");
                break;
            case "8":
                await page.keyboard.press("8");
                break;
            case "9":
                await page.keyboard.press("9");
                break;
            case ".":
                await page.keyboard.press(".");
                break;
        }
        await page.waitForTimeout(300);
    }
    await page.waitForTimeout(1000);
    await page.keyboard.press("Enter");
};
exports.inputNumber = inputNumber;
//
const inputSelectBox = async function(page,tag,selectBox,value){
    await page.click(tag);
    page.waitForTimeout(1000);
    let index = selectBox.indexOf(value);
    if (index ==-1){
        console.log("[inputSelectBox][error]]セレクトボックスの中に対象が存在しません。",value)
        return
    }
    //
    await page.keyboard.press("ArrowDown");
    page.waitForTimeout(2000);
    for( let i=0; i < index; i++ ){
        await page.keyboard.press("ArrowDown");
        if ( i%30 == 0){
            await page.waitForTimeout(1000);
        }
    }
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
};
exports.inputSelectBox = inputSelectBox;

const inputPulsTextBox = async function(page,tag,arr){
    if (! await page.$(tag)) {
        console.log('指定したinputPulsTextBoxがありません:'+tag)
        return new Error('指定したinputPulsTextBoxがありません:'+tag);
    }
    await page.click(tag);
    if( !Array.isArray(arr) ){
        await page.type(tag, arr);
        return
    }
    for (let i=0; i< arr.length ; i++){
       if ( i== 0 ){
        await page.type(tag, arr[i]);
       } else{
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(100);
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.type(tag, arr[i]);
       }
    }
};
exports.inputPulsTextBox = inputPulsTextBox;

const convertZenkaku = function zenkaku2Hankaku(str) {
    return str.replace(/[A-Za-z0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}
exports.convertZenkaku = convertZenkaku;



