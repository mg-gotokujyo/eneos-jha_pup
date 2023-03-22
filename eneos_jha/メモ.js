let Worknamearray =[];
for (let i= 1; i<5; i++){
 Worknamearray.push(csvData[i][5])
 console.log(Worknamearray)
 function existsSameValue(a){
     var s = new Set(a);
     return s.size != a.length;
   }
   Worknamearray.push(csvData[i+1][5])
   console.log(Worknamearray)
   console.log(existsSameValue(Worknamearray))
if(existsSameValue(Worknamearray)==true)
{
 console.log("重複していますので重複を消します")
let  Deleteedoverlapping = Array.from(new Set(Worknamearray))
console.log(Deleteedoverlapping);
}else if(existsSameValue(Worknamearray)==false){
 console.log("重複はしていませんそのまま進めます")

}}