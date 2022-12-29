const str = 'Hello - world - if this';
let count = 0
// 👇️ 2
for (let i = 0; i < str.length; i++) {
   if (str.charAt(i) === "-") {
    count++
   }
    
}
console.log(count);
